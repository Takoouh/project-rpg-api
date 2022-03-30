import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from 'src/Controllers/Places/places.controller';
import { CharactersEntity } from 'src/Entity/Characters/characters.entity';
import { PlaceEntity } from 'src/Entity/Places/places.entity';
import { CharactersService } from 'src/Services/Characters/characters.service';
import { PlacesService } from 'src/Services/Places/places.services';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity, CharactersEntity])],
  controllers: [PlacesController],
  providers: [PlacesService, CharactersService],
})
export class PlacesModule { }
