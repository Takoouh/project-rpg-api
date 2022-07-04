import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceTableDto } from 'src/Dto/Place/Place.dto';
import { PlaceEntity } from 'src/Entity/Places/places.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlaceEntity)
    private placesRepository: Repository<PlaceEntity>,
  ) {}

  getAllPlaces(): Promise<PlaceTableDto[]> {
    return this.placesRepository.find();
  }

  addPlace(place: PlaceTableDto): Promise<PlaceTableDto> {
    return this.placesRepository.save(place);
  }

  getBeginningTown(): Promise<PlaceTableDto> {
    return this.placesRepository.findOne({
      where: { is_beginning_town: true },
    });
  }
}
