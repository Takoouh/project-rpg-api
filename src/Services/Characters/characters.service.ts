import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CharacterTableDto,
  CharacterFullInfosDto,
  CharacterEditInfoDto,
  CharacterMinimumInfosDto,
} from '../../Dto/Character/character.dto';
import { CharactersEntity } from '../../Entity/Characters/characters.entity';
import { formatCharactersInfos } from '../../Helpers/CharactersHelper/charactersHelpers';

import { PlacesService } from '../Places/places.service';
import * as LEVELING_GRID from '../../Data/leveling_grid.json';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharactersEntity)
    private charactersRepository: Repository<CharactersEntity>,
    @Inject(forwardRef(() => PlacesService))
    private readonly placesService: PlacesService,
  ) {}

  /**
   * Create a new Character
   * @param {CharacterTableDto} character
   * @returns {Promise<CharacterTableDto>}
   */
  createCharacter(character: CharacterTableDto): Promise<CharacterTableDto> {
    const firstLevelInfo = LEVELING_GRID.find(({ level }) => level === 1);
    character.life_points = firstLevelInfo.life_points;
    character.exp_to_level_up = firstLevelInfo.exp_to_level_up;
    return this.charactersRepository.save(character);
  }

  /**
   * Delete a Character
   * @param {number} id Character Id
   * @returns {Promise<CharacterTableDto>}
   */
  async deleteCharacter(id: number): Promise<CharacterTableDto> {
    const characterToDelete = await this.charactersRepository.findOne(id);
    return this.charactersRepository.remove(characterToDelete);
  }

  /**
   * Update character with new data
   * @param {number} id Character id
   * @param {CharacterEditInfoDto} newCharacterInfos updated info of character
   * @returns {Promise<CharacterFullInfosDto>} Updated Character
   */
  async updateCharacter(
    id: number,
    newCharacterInfos: CharacterEditInfoDto,
  ): Promise<CharacterFullInfosDto> {
    await this.charactersRepository.update({ id }, newCharacterInfos);
    let updatedCharacter = await this.findCharacter(id);
    // we check if character has leveled up and if level is not maxed
    if (
      updatedCharacter.experience >= updatedCharacter.exp_to_level_up &&
      updatedCharacter.level < 20
    ) {
      let characterWithLevelUpInfos: CharacterEditInfoDto = {
        level: updatedCharacter.level,
        experience: updatedCharacter.experience,
        exp_to_level_up: updatedCharacter.exp_to_level_up,
        skill_points: updatedCharacter.skill_points,
      };

      //While character can level up, we resolve those before updating
      while (
        characterWithLevelUpInfos.experience >=
        characterWithLevelUpInfos.exp_to_level_up
      ) {
        const leveledUpInfos = LEVELING_GRID.find(
          ({ level }) => level === characterWithLevelUpInfos.level + 1,
        );

        characterWithLevelUpInfos = {
          experience:
            characterWithLevelUpInfos.experience -
            characterWithLevelUpInfos.exp_to_level_up,
          life_points: leveledUpInfos.life_points,
          level: leveledUpInfos.level,
          exp_to_level_up: leveledUpInfos.exp_to_level_up,
          skill_points: characterWithLevelUpInfos.skill_points + 2,
        };
      }

      await this.charactersRepository.update({ id }, characterWithLevelUpInfos);
      updatedCharacter = await this.findCharacter(id);
    }

    return updatedCharacter;
  }

  /**
   * get specific character
   * @param {number} id CharacterId
   * @returns {Promise<CharacterFullInfosDto>}
   */
  async findCharacter(id: number): Promise<CharacterFullInfosDto> {
    let characterInfo = await this.charactersRepository.findOne({
      where: { id },
      relations: ['items', 'place'],
    });
    if (!characterInfo) {
      throw new HttpException(
        {
          status: 500,
          error: `The character with id ${id} doesn't exist`,
        },
        500,
      );
    }
    if (!characterInfo.place) {
      // set player to beginner town if player is nowhere
      const beginningTown = await this.placesService.getBeginningTown();
      await this.charactersRepository.update({ id }, { place: beginningTown });
      characterInfo = await this.charactersRepository.findOne({
        where: { id },
        relations: ['items', 'place'],
      });
    }
    return formatCharactersInfos(characterInfo);
  }

  /**
   * get all created character
   * @returns {Promise<CharacterMinimumInfosDto[]>}
   */
  findAll(): Promise<CharacterMinimumInfosDto[]> {
    return this.charactersRepository.find();
  }

  /**
   * Revive dead character in exhange of toll (to be defined)
   * @param {number} characterId
   * @returns {Promise<CharacterFullInfosDto>}
   */
  async reviveCharacter(characterId: number): Promise<CharacterFullInfosDto> {
    const characterInfo = await this.findCharacter(characterId);
    if (characterInfo.remaining_life_points > 0) {
      throw new Error('Character is not Dead');
    }
    await this.charactersRepository.update(
      { id: characterId },
      { remaining_life_points: characterInfo.life_points },
    );
    return this.findCharacter(characterId);
  }

  /**
   * Use gold to rest in inn and restore Character Health
   * - Character needs 15 gold
   * @param {number} characterId
   * @returns {Promise<CharacterFullInfosDto>}
   */
  async restInInn(characterId: number): Promise<CharacterFullInfosDto> {
    const characterInfo = await this.findCharacter(characterId);
    //we check if village where player is has an Inn
    if (characterInfo.place.has_inn) {
      if (characterInfo.gold < 15) {
        throw new Error('Character doesnt have enough gold to rest in Inn');
      }
      return this.updateCharacter(characterId, {
        gold: characterInfo.gold - 15,
        remaining_life_points: characterInfo.life_points,
      });
    } else {
      throw new Error('There is no inn in proximity');
    }
  }

  /**
   * Use Character Skill point to enhance on of it's stat
   * @param {number} characterId id of character to attribute skill point
   * @param {string} stat stat to enhance : 'strength' | 'speed' | 'intelligence'
   * @returns {Promise<CharacterFullInfosDto>}
   */
  async attributeSkillPoint(
    characterId: number,
    stat: string,
  ): Promise<CharacterFullInfosDto> {
    const characterInfo = await this.findCharacter(characterId);
    const possibleStats = ['strength', 'speed', 'intelligence'];
    if (characterInfo.skill_points < 1) {
      throw new Error("You don't have any skill points to attribute");
    } else if (!possibleStats.includes(stat)) {
      throw new Error('This is not a correct stat to enhance');
    } else {
      const newCharacterStats = {
        skill_points: characterInfo.skill_points - 1,
        [stat]: characterInfo.stats[stat] + 1,
      };
      return this.updateCharacter(characterId, newCharacterStats);
    }
  }
}
