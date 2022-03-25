import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattleModule } from './Modules/Battle/battle.module';
import { CharactersModule } from './Modules/Characters/characters.module';
import { ItemsModule } from './Modules/Items/items.module';
import { MonstersModule } from './Modules/Monsters/monsters.module';
import { SpellsModule } from './Modules/Spells/spells.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CharactersModule,
    ItemsModule,
    MonstersModule,
    SpellsModule,
    BattleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
