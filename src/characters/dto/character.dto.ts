import { IsNumber, IsObject, IsString } from "class-validator"

export class CharacterDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  level: number;

  @IsNumber()
  remaining_life_point: number;

  @IsNumber()
  life_point: number;

  @IsNumber()
  strength: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  intelligence: number;
}



class StatsDTO {
  @IsNumber()
  strength: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  intelligence: number;
}

export class CharacterInfoFormattedDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  level: number;

  @IsNumber()
  remaining_life_point: number;

  @IsNumber()
  life_point: number;

  @IsObject()
  stats: StatsDTO;


}