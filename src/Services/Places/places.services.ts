import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterFullInfosDto } from 'src/Dto/Character/character.dto';
import { PlaceTableDto } from 'src/Dto/Place/Place.dto';
import { PlaceEntity } from 'src/Entity/Places/places.entity';
import { Repository } from 'typeorm';
import { CharactersService } from '../Characters/characters.service';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity)
    private placesRepository: Repository<PlaceEntity>,
    private charactersServices: CharactersService,
  ) { }

  getAllPlaces(): Promise<PlaceTableDto[]> {
    return this.placesRepository.find();
  }

  async restInInn(
    placeId: number,
    charactedId: number,
  ): Promise<CharacterFullInfosDto> {
    const placeInfo = await this.placesRepository.findOne({ id: placeId });

    //we check if village where player is has an Inn
    if (placeInfo.hasInn) {
      const characterInfo = await this.charactersServices.findCharacter(
        charactedId,
      );

      if (characterInfo.gold < 15) {
        throw new Error('Character doesnt have enough gold to rest in Inn');
      }

      return this.charactersServices.updateCharacter(charactedId, {
        gold: characterInfo.gold - 15,
        remaining_life_point: characterInfo.life_point,
      });
    }
  }
}
