import { InjectRepository } from '@nestjs/typeorm';
import { BattleInfoDto, BattleTableDto } from 'src/Dto/Battle/battle.dto';
import { BattleEntity } from 'src/Entity/Battle/battle.entity';
import { Repository } from 'typeorm';
import { CharacterItemsService } from '../Characters/characterItems.service';
import { CharactersService } from '../Characters/characters.service';
import { MonstersService } from '../Monsters/monsters.service';

export class BattleService {
  constructor(
    @InjectRepository(BattleEntity)
    private battleRepository: Repository<BattleEntity>,
    private charactersService: CharactersService,
    private monsterService: MonstersService,
    private characterItemService: CharacterItemsService,
  ) { }

  async initBattle({
    characterId,
    monsterId,
  }: {
    characterId: number;
    monsterId: number;
  }): Promise<BattleTableDto> {
    const characterInfo = await this.charactersService.findCharacter(
      characterId,
    );

    if (!characterInfo) {
      throw new Error('this character doesnt exist');
    }

    const monsterInfo = await this.monsterService.getMonster(monsterId);

    //check if player is already in a fight before initiating one
    const playerCurrentFight = await this.battleRepository.findOne({
      where: { characterId },
    });
    if (playerCurrentFight) {
      throw new Error('player is already fighting');
    }

    const battleData = {
      characterId,
      monsterId,
      monsterRemainingLife: monsterInfo.life_point,
    };
    return this.battleRepository.save(battleData);
  }

  findBattles(): Promise<BattleTableDto[]> {
    return this.battleRepository.find();
  }

  async findBattle(characterId: number): Promise<BattleTableDto> {
    const { id } = await this.charactersService.findCharacter(characterId);
    return this.battleRepository.findOne({
      where: { characterId: id },
    });
  }

  async playerAttack(battleId: number): Promise<BattleInfoDto> {
    const battleData = await this.battleRepository.findOne(battleId);
    const { characterId, monsterId, monsterRemainingLife } = battleData;
    const characterInfo = await this.charactersService.findCharacter(
      characterId,
    );
    const monsterInfo = await this.monsterService.getMonster(monsterId);
    const newMonsterRemainingLife =
      monsterRemainingLife - characterInfo.stats.strength;

    const isMonsterKo = newMonsterRemainingLife <= 0;

    //if monster has been killed, we attribute reward
    if (isMonsterKo) {
      const acquiredLoot = [];

      monsterInfo.potentialItemDrop.forEach((drop) => {
        const randomNumber = Math.random() * 100;
        if (drop.dropRate <= randomNumber) {
          acquiredLoot.push(drop.item);
        }
      });

      const playerWithReward = {
        gold: characterInfo.gold + monsterInfo.gold,
        experience: characterInfo.experience + monsterInfo.experience,
      };
      this.battleRepository.remove(battleData);
      this.charactersService.updateCharacter(characterId, playerWithReward);
      acquiredLoot.map((item) =>
        this.characterItemService.addItemToCharacter(characterInfo.id, item.id),
      );
      return {
        monsterRemainingLife: 0,
        isBattleOver: true,
        reward: {
          experience: monsterInfo.experience,
          gold: monsterInfo.gold,
          items: acquiredLoot,
        },
      };
    }

    //if monster is still alive, it retaliate
    this.battleRepository.update(
      { id: battleId },
      { monsterRemainingLife: newMonsterRemainingLife },
    );

    return {
      monsterRemainingLife: newMonsterRemainingLife,
      isBattleOver: false,
      reward: { experience: 0, gold: 0, items: [] },
    };
  }
}