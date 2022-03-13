import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { ItemsModule } from './items/items.module';
import { MonstersModule } from './monsters/monsters.module';
import { SpellsModule } from './spells/spells.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CharactersModule,
    ItemsModule,
    MonstersModule,
    SpellsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
