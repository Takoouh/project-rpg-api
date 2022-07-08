import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleController } from 'src/Controllers/Battle/battle.controller';
import { BattleEntity } from 'src/Entity/Battle/battle.entity';
import { BattleService } from 'src/Services/Battle/battle.service';
import { CharactersModule } from '../Characters/characters.module';
import { MonstersModule } from '../Monsters/monsters.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BattleEntity]),
    forwardRef(() => CharactersModule),
    forwardRef(() => MonstersModule),
  ],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}
