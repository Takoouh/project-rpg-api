import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpellsController } from '../../Controllers/Spells/spells.controller';
import { SpellEntity } from '../../Entity/Spells/spell.entity';
import { SpellsService } from '../../Services/Spells/spells/spells.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpellEntity])],
  controllers: [SpellsController],
  providers: [SpellsService],
})
export class SpellsModule {}
