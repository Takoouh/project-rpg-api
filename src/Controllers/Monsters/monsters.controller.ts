import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MonsterDto } from '../../Dto/Monster/monster.dto';
import { MonstersService } from '../../Services/Monsters/monsters.service';

@Controller('monsters')
export class MonstersController {
  constructor(private monstersService: MonstersService) { }

  @Post('/')
  addMonster(@Body() character: MonsterDto): Promise<MonsterDto> {
    return this.monstersService.addMonster(character);
  }

  @Delete('/:id')
  deleteMonster(@Param() { id }: { id: number }): Promise<MonsterDto> {
    return this.monstersService.deleteMonster(id);
  }

  @Get('/:id')
  getMonster(@Param() { id }: { id: number }): Promise<MonsterDto> {
    return this.monstersService.getMonster(id);
  }

  @Get('/')
  getAllMonsters(): Promise<MonsterDto[]> {
    return this.monstersService.getAllMonsters();
  }
}
