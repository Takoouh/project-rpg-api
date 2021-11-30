import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonstersController } from './controller/monsters.controller';
import { MonsterEntity } from './entity/monsters.entity';
import { MonstersService } from './service/monsters/monsters.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterEntity])],
  controllers: [MonstersController],
  providers: [MonstersService]
})
export class MonstersModule { }
