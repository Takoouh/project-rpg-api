import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CharacterTableDto,
  CharacterFullInfosDto,
  CharacterEditInfoDto,
  CharacterMinimumInfosDto,
} from '../../Dto/Character/character.dto';
import { CharactersEntity } from '../../Entity/Characters/characters.entity';
import { formatCharactersInfos } from '../../Helpers/CharactersHelper/charactersHelpers';
import { Repository } from 'typeorm';
import { PlacesService } from '../Places/places.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharactersEntity)
    private charactersRepository: Repository<CharactersEntity>,
    @Inject(forwardRef(() => PlacesService))
    private readonly placesService: PlacesService,
  ) {}

  create(character: CharacterTableDto): Promise<CharacterTableDto> {
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
    return this.findCharacter(id);
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
