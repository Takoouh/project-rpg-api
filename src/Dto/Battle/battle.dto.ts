/* eslint-disable prettier/prettier */
import { IsArray, IsNumber } from 'class-validator';
import { ItemListDto } from '../Item/item.dto';

export class BattleTableDto {
  @IsNumber()
  id: number;

  @IsNumber()
  characterId: number;

  @IsNumber()
  monsterId: number;

  @IsNumber()
  monsterRemainingLife: number;
}


export class BattleInitDto {
  @IsNumber()
  characterId: number;

  @IsNumber()
  monsterId: number;
}

export class BattleInfoDto {
  @IsNumber()
  monsterRemainingLife: number;

  @IsArray()
  reward: BattleRewardDto[]
}

class BattleRewardDto {
  @IsNumber()
  gold: number;

  @IsArray()
  items: ItemListDto[]
}