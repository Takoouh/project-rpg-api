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

  createCharacter(character: CharacterTableDto): Promise<CharacterTableDto> {
    const firstLevelInfo = LEVELING_GRID.find(({ level }) => level === 1);
    character.life_point = firstLevelInfo.life_point;
    character.exp_to_level_up = firstLevelInfo.exp_to_level_up;
    return this.charactersRepository.save(character);
  }

  async deleteCharacter(id: number): Promise<CharacterTableDto> {
    const characterToDelete = await this.charactersRepository.findOne(id);
    return this.charactersRepository.remove(characterToDelete);
  }

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
        skill_point: updatedCharacter.skill_point,
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
          life_point: leveledUpInfos.life_point,
          level: leveledUpInfos.level,
          exp_to_level_up: leveledUpInfos.exp_to_level_up,
          skill_point: characterWithLevelUpInfos.skill_point + 2,
        };
      }

      await this.charactersRepository.update({ id }, characterWithLevelUpInfos);
      updatedCharacter = await this.findCharacter(id);
    }

    return updatedCharacter;
  }

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

  findAll(): Promise<CharacterMinimumInfosDto[]> {
    return this.charactersRepository.find();
  }

  async reviveCharacter(characterId: number): Promise<CharacterFullInfosDto> {
    const characterInfo = await this.findCharacter(characterId);
    if (characterInfo.remaining_life_point > 0) {
      throw new Error('Character is not Dead');
    }
    await this.charactersRepository.update(
      { id: characterId },
      { remaining_life_point: characterInfo.life_point },
    );
    return this.findCharacter(characterId);
  }

  async restInInn(charactedId: number): Promise<any> {
    const characterInfo = await this.findCharacter(charactedId);
    //we check if village where player is has an Inn
    if (characterInfo.place.has_inn) {
      if (characterInfo.gold < 15) {
        throw new Error('Character doesnt have enough gold to rest in Inn');
      }
      return this.updateCharacter(charactedId, {
        gold: characterInfo.gold - 15,
        remaining_life_point: characterInfo.life_point,
      });
    } else {
      throw new Error('There is no inn in proximity');
    }
  }
}
