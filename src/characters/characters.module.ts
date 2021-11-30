import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersController } from './controller/characters.controller';
import { CharactersEntity } from './entity/characters.entity';
import { CharactersService } from './service/characters/characters.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharactersEntity])],
  controllers: [CharactersController],
  providers: [CharactersService]
})
export class CharactersModule { }
