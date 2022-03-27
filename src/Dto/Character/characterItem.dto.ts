import { IsNumber } from 'class-validator';

export class CharacterItemsTableDto {
  @IsNumber()
  id: number;

  @IsNumber()
  characterId: number;

  @IsNumber()
  itemId: number;

  @IsNumber()
  quantity: number;
}
