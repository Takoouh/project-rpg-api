import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
