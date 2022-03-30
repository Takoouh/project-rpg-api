import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class PlaceTableDto {
  @IsNumber()
  id: number;

  @IsString()
  place_name: string;

  @IsBoolean()
  hasInn: boolean;
}
