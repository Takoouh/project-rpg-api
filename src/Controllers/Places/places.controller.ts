import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CharacterFullInfosDto } from 'src/Dto/Character/character.dto';
import { PlaceTableDto } from 'src/Dto/Place/Place.dto';
import { PlacesService } from 'src/Services/Places/places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesServices: PlacesService) {}

  @Get('/')
  getAllPlaces(): Promise<PlaceTableDto[]> {
    return this.placesServices.getAllPlaces();
  }

  @Post('/')
  addPlace(@Body() place: PlaceTableDto): Promise<PlaceTableDto> {
    return this.placesServices.addPlace(place);
  }

  @Patch('/:placeId/inn/:characterId')
  restInInn(
    @Param() { placeId, characterId }: { placeId: number; characterId: number },
  ): Promise<CharacterFullInfosDto> {
    return this.placesServices.restInInn(placeId, characterId);
  }
}
