import { InjectRepository } from '@nestjs/typeorm';
import { BattleInfoDto, BattleTableDto } from 'src/Dto/Battle/battle.dto';
import { BattleEntity } from 'src/Entity/Battle/battle.entity';
import { Repository } from 'typeorm';
import { CharactersService } from '../Characters/characters.service';
import { MonstersService } from '../Monsters/monsters.service';

export class BattleService {
  constructor(
    @InjectRepository(BattleEntity)
    private battleRepository: Repository<BattleEntity>,
    private charactersService: CharactersService,
    private monsterService: MonstersService,
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
    const { characterId, /*monsterId,*/ monsterRemainingLife } = battleData;
    const characterInfo = await this.charactersService.findCharacter(
      characterId,
    );
    // const monsterInfo = await this.monsterService.getMonster(monsterId);
    const newMonsterRemainingLife =
      monsterRemainingLife - characterInfo.stats.strength;

    const isMonsterKo = newMonsterRemainingLife <= 0;

    if (isMonsterKo) {
      this.battleRepository.remove(battleData);
      return {
        monsterRemainingLife: 0,
        reward: [],
      };
    }

    this.battleRepository.update(
      { id: battleId },
      { monsterRemainingLife: newMonsterRemainingLife },
    );

    return {
      monsterRemainingLife: newMonsterRemainingLife,
      reward: [],
    };
  }
}
