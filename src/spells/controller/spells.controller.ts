import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SpellDto } from '../dto/spell.dto';
import { SpellsService } from '../service/spells/spells.service';

@Controller('spells')
export class SpellsController {
  constructor(private spellsService: SpellsService) {}

  @Post('/')
  addSpell(@Body() spell: SpellDto): Promise<SpellDto> {
    return this.spellsService.addSpell(spell);
  }

  @Delete('/:id')
  deleteSpell(@Param() { id }: { id: number }): Promise<SpellDto> {
    return this.spellsService.deleteSpell(id);
  }

  @Get('/:id')
  getSpell(@Param() { id }: { id: number }): Promise<SpellDto> {
    return this.spellsService.getSpell(id);
  }

  @Get('/')
  getAllSpells(@Query() query: { [key: string]: string }): Promise<SpellDto[]> {
    return this.spellsService.getAllSpells(query);
  }
}
