import { IsNumber, IsString } from 'class-validator';

export class SpellDto {
  @IsNumber()
  id: number;

  @IsString()
  spell_name: string;

  @IsString()
  spell_rank: string;

  @IsString()
  spell_type: string;

  @IsNumber()
  cost: number;

  @IsString()
  effect: string;
}
