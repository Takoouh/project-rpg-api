import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
import { ItemListDto } from '../Item/item.dto';
import { PlaceTableDto } from '../Place/Place.dto';

export class CharacterTableDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  level: number;

  @IsNumber()
  experience: number;

  @IsNumber()
  exp_to_level_up: number;

  @IsNumber()
  remaining_life_points: number;

  @IsNumber()
  skill_points: number;

  @IsNumber()
  life_points: number;

  @IsNumber()
  gold: number;

  @IsNumber()
  strength: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  intelligence: number;

  @IsObject()
  place: PlaceTableDto;
}

export class CharacterTableWithItemsDto extends CharacterTableDto {
  @IsArray()
  items: ItemListDto[];
}

export class CharacterEditInfoDto {
  @IsString()
  name?: string;

  @IsNumber()
  level?: number;

  @IsNumber()
  experience?: number;

  @IsNumber()
  exp_to_level_up?: number;

  @IsNumber()
  skill_points?: number;

  @IsNumber()
  remaining_life_points?: number;

  @IsNumber()
  life_points?: number;

  @IsNumber()
  gold?: number;

  @IsNumber()
  strength?: number;

  @IsNumber()
  speed?: number;

  @IsNumber()
  intelligence?: number;
}

class StatsDTO {
  @IsNumber()
  strength: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  intelligence: number;
}

export class CharacterFullInfosDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  level: number;

  @IsNumber()
  experience: number;

  @IsNumber()
  exp_to_level_up: number;

  @IsNumber()
  remaining_life_points: number;

  @IsNumber()
  skill_points: number;

  @IsNumber()
  gold: number;

  @IsNumber()
  life_points: number;

  @IsObject()
  stats: StatsDTO;

  @IsArray()
  items: ItemListDto[];

  @IsObject()
  place: PlaceTableDto;
}

export class CharacterMinimumInfosDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  level: number;
}
