import { IsNumber, IsObject, IsString } from 'class-validator';

export class ItemDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsString()
  type: string;

  @IsString()
  subtype: string;

  @IsNumber()
  price: number;

  @IsNumber()
  selling_price: number;

  @IsString()
  effect: string;
}

export class ItemListDto {
  @IsObject()
  item: ItemDto;

  @IsNumber()
  quantity: number;
}
