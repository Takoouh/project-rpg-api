import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleController } from 'src/Controllers/Battle/battle.controller';
import { BattleEntity } from 'src/Entity/Battle/battle.entity';
import { CharacterItemsEntity } from 'src/Entity/Characters/characterItems.entity';
import { CharactersEntity } from 'src/Entity/Characters/characters.entity';
import { MonsterEntity } from 'src/Entity/Monsters/monsters.entity';
import { BattleService } from 'src/Services/Battle/battle.service';
import { CharacterItemsService } from 'src/Services/Characters/characterItems.service';
import { CharactersService } from 'src/Services/Characters/characters.service';
import { MonstersService } from 'src/Services/Monsters/monsters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BattleEntity,
      CharactersEntity,
      MonsterEntity,
      CharacterItemsEntity,
    ]),
  ],
  controllers: [BattleController],
  providers: [
    BattleService,
    CharactersService,
    MonstersService,
    CharacterItemsService,
  ],
})
export class BattleModule { }
