import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterItemsEntity } from 'src/Entity/Characters/characterItems.entity';
import { CharacterItemsService } from 'src/Services/Characters/characterItems.service';
import { CharactersController } from '../../Controllers/Characters/characters.controller';
import { CharactersEntity } from '../../Entity/Characters/characters.entity';
import { CharactersService } from '../../Services/Characters/characters.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharactersEntity, CharacterItemsEntity])],
  controllers: [CharactersController],
  providers: [CharactersService, CharacterItemsService],
})
export class CharactersModule {}
