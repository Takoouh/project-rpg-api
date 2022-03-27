import { IsNumber, IsObject, IsString } from 'class-validator';

export class ItemDto {
  @IsNumber()
  id: number;

  @IsString()
  item_name: string;

  @IsString()
  item_desc: string;

  @IsString()
  type: string;

  @IsString()
  subtype: string;

  @IsNumber()
  price: number;

  @IsNumber()
  strengh: number;

  @IsNumber()
  speed: number;
}

export class ItemListDto {
  @IsObject()
  item: ItemDto;

  @IsNumber()
  quantity: number;
}