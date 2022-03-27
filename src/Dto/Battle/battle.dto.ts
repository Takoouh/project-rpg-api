/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsNumber } from 'class-validator';
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


class BattleRewardDto {
  @IsNumber()
  experience: number;

  @IsNumber()
  gold: number;

  @IsArray()
  items: ItemListDto[]
}

export class BattleInfoDto {
  @IsNumber()
  monsterRemainingLife: number;

  @IsBoolean()
  isBattleOver: boolean

  @IsArray()
  reward: BattleRewardDto
}
