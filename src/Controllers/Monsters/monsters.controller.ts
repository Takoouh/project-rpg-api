import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MonsterInfoDto, MonsterTableDto } from '../../Dto/Monster/monster.dto';
import { MonstersService } from '../../Services/Monsters/monsters.service';

@Controller('monsters')
export class MonstersController {
  constructor(private monstersService: MonstersService) {}

  @Post('/')
  addMonster(@Body() monster: MonsterInfoDto): Promise<MonsterInfoDto> {
    return this.monstersService.addMonster(monster);
  }

  @Delete('/:id')
  deleteMonster(@Param() { id }: { id: number }): Promise<MonsterTableDto> {
    return this.monstersService.deleteMonster(id);
  }

  @Patch('/:id')
  updateMonster(
    @Param() { id }: { id: number },
    @Body() monster: MonsterInfoDto,
  ): Promise<MonsterTableDto> {
    return this.monstersService.updateMonster(id, monster);
  }

  @Post('/:monsterId/add-item/:itemId/:dropRate')
  addItemToMonster(
    @Param('itemId') itemId: string,
    @Param('monsterId') monsterId: string,
    @Param('dropRate') dropRate: string,
  ): Promise<MonsterInfoDto> {
    return this.monstersService.addItemToMonster(
      parseInt(monsterId),
      parseInt(itemId),
      parseInt(dropRate),
    );
  }

  @Get('/:id')
  getMonster(@Param() { id }: { id: number }): Promise<MonsterInfoDto> {
    return this.monstersService.getMonster(id);
  }

  @Get('/')
  getAllMonsters(): Promise<MonsterTableDto[]> {
    return this.monstersService.getAllMonsters();
  }
}
