import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersController } from '../../Controllers/Characters/characters.controller';
import { CharactersEntity } from '../../Entity/Characters/characters.entity';
import { CharactersService } from '../../Services/Characters/characters.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharactersEntity])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule { }
