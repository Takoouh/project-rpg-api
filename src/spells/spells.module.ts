import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpellsController } from './controller/spells.controller';
import { SpellEntity } from './entity/spell.entity';
import { SpellsService } from './service/spells/spells.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpellEntity])],
  controllers: [SpellsController],
  providers: [SpellsService],
})
export class SpellsModule {}
