import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleController } from 'src/Controllers/Battle/battle.controller';
import { BattleEntity } from 'src/Entity/Battle/battle.entity';
import { CharactersEntity } from 'src/Entity/Characters/characters.entity';
import { MonsterEntity } from 'src/Entity/Monsters/monsters.entity';
import { BattleService } from 'src/Services/Battle/battle.service';
import { CharactersService } from 'src/Services/Characters/characters.service';
import { MonstersService } from 'src/Services/Monsters/monsters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BattleEntity]),
    TypeOrmModule.forFeature([CharactersEntity]),
    TypeOrmModule.forFeature([MonsterEntity]),
  ],
  controllers: [BattleController],
  providers: [BattleService, CharactersService, MonstersService],
})
export class BattleModule { }
