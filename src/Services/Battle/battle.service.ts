import { forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleInfoDto, BattleTableDto } from 'src/Dto/Battle/battle.dto';
import { BattleEntity } from 'src/Entity/Battle/battle.entity';
import { attributeMonsterLoot } from 'src/Helpers/BattleHelper/BattleHelper';
import { Repository } from 'typeorm';
import { CharacterItemsService } from '../Characters/characterItems.service';
import { CharactersService } from '../Characters/characters.service';
import { MonstersService } from '../Monsters/monsters.service';

import * as LEVELING_GRID from '../../Data/leveling_grid.json';

export class BattleService {
  constructor(
    @InjectRepository(BattleEntity)
    private battleRepository: Repository<BattleEntity>,
    @Inject(forwardRef(() => CharactersService))
    private charactersService: CharactersService,
    @Inject(forwardRef(() => MonstersService))
    private monsterService: MonstersService,
    @Inject(forwardRef(() => CharacterItemsService))
    private characterItemService: CharacterItemsService,
  ) {}

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

    if (characterInfo.remaining_life_points === 0) {
      throw new Error('Dead character cant fight');
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
      monsterRemainingLife: monsterInfo.life_points,
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
      const acquiredLoot = attributeMonsterLoot(monsterInfo.potentialItemDrop);
      const playerWithReward = {
        gold: characterInfo.gold + monsterInfo.gold,
        experience: characterInfo.experience + monsterInfo.experience,
      };
      this.battleRepository.remove(battleData);
      await this.charactersService.updateCharacter(
        characterId,
        playerWithReward,
      );
      acquiredLoot.map((item) =>
        this.characterItemService.addItemToCharacter(characterId, item.id),
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
    const characterLifeAfterRetaliation =
      characterInfo.remaining_life_points - monsterInfo.strength;

    //If player has 0 or less HP after the attack, player die (not IRL)
    if (characterLifeAfterRetaliation <= 0) {
      const firstLevelInfos = LEVELING_GRID.find(({ level }) => level === 1);
      this.charactersService.updateCharacter(characterId, {
        remaining_life_points: 0,
        life_points: firstLevelInfos.life_points,
        exp_to_level_up: firstLevelInfos.exp_to_level_up,
        level: 1,
        experience: 0,
        gold: 0,
        skill_points: 0,
        strength: 5,
        speed: 5,
        intelligence: 5,
      });
      this.characterItemService.deleteCharacterItems(characterId);
      this.battleRepository.remove(battleData);
      return {
        monsterRemainingLife,
        isBattleOver: true,
        reward: {
          experience: 0,
          gold: 0,
          items: [],
        },
      };
    }

    this.charactersService.updateCharacter(characterId, {
      remaining_life_points: characterLifeAfterRetaliation,
    });
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
