import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterItemsEntity } from 'src/Entity/Monsters/monstersItem.entity';
import { MonsterItemsService } from 'src/Services/Monsters/monsterItems.service';
import { MonstersController } from '../../Controllers/Monsters/monsters.controller';
import { MonsterEntity } from '../../Entity/Monsters/monsters.entity';
import { MonstersService } from '../../Services/Monsters/monsters.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterEntity, MonsterItemsEntity])],
  controllers: [MonstersController],
  providers: [MonstersService, MonsterItemsService],
  exports: [MonstersService],
})
export class MonstersModule {}
