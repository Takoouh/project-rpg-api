import { Controller, Param, Post, Get, Patch } from '@nestjs/common';
import {
  BattleInfoDto,
  BattleInitDto,
  BattleTableDto,
} from 'src/Dto/Battle/battle.dto';
import { BattleService } from 'src/Services/Battle/battle.service';

@Controller('battle')
export class BattleController {
  constructor(private battleService: BattleService) {}

  @Post('/:characterId/:monsterId')
  initBattle(
    @Param()
    { characterId, monsterId }: { characterId: number; monsterId: number },
  ): Promise<BattleInitDto> {
    return this.battleService.initBattle({ characterId, monsterId });
  }

  @Get('/')
  findBattles(): Promise<BattleTableDto[]> {
    return this.battleService.findBattles();
  }

  @Get('/:characterId')
  findBattle(
    @Param() { characterId }: { characterId: number },
  ): Promise<BattleTableDto> {
    return this.battleService.findBattle(characterId);
  }

  @Patch('/:battleId/attack')
  playerAttack(
    @Param() { battleId }: { battleId: number },
  ): Promise<BattleInfoDto> {
    return this.battleService.playerAttack(battleId);
  }

  @Patch('/:battleId/use-item/:itemId')
  playerUseItemInBattle(
    @Param('battleId') battleId: string,
    @Param('itemId') itemId: string,
  ): Promise<BattleInfoDto> {
    return this.battleService.playerUseItem(
      parseInt(battleId),
      parseInt(itemId),
    );
  }
}
