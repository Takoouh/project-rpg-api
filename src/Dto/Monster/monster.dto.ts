import { IsNumber, IsObject, IsString } from 'class-validator';
import { ItemDto } from '../Item/item.dto';

export class MonsterTableDto {
  @IsNumber()
  id: number;

  @IsString()
  monster_name: string;

  @IsString()
  life_point: number;

  @IsNumber()
  strengh: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  gold: number;

  @IsNumber()
  experience: number;
}

export class MonsterInfoDto {
  @IsString()
  monster_name: string;

  @IsString()
  life_point: number;

  @IsNumber()
  strengh: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  gold: number;

  @IsNumber()
  experience: number;

  @IsObject()
  potentialItemDrop: MonsterItemDto[];
}

export class MonsterItemDto {
  @IsNumber()
  item: ItemDto;

  @IsNumber()
  dropRate: number;
}