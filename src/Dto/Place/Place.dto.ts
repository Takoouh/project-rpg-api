import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class PlaceTableDto {
  @IsNumber()
  id: number;

  @IsString()
  place_name: string;

  @IsBoolean()
  has_inn: boolean;

  @IsBoolean()
  is_beginning_town: boolean;
}
