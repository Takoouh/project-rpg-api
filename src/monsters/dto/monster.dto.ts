import { IsNumber, IsString } from 'class-validator';

export class MonsterDto {
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
}
