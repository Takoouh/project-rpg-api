import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonstersController } from '../../Controllers/Monsters/monsters.controller';
import { MonsterEntity } from '../../Entity/Monsters/monsters.entity';
import { MonstersService } from '../../Services/Monsters/monsters.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterEntity])],
  controllers: [MonstersController],
  providers: [MonstersService],
})
export class MonstersModule { }
