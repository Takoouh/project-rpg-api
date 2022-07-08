import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from 'src/Controllers/Places/places.controller';
import { CharactersEntity } from 'src/Entity/Characters/characters.entity';
import { PlaceEntity } from 'src/Entity/Places/places.entity';
import { PlacesService } from 'src/Services/Places/places.service';
import { CharactersModule } from '../Characters/characters.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity])],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
