import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ItemDto } from '../dto/item.dto';
import { ItemsService } from '../service/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post('/')
  addItem(@Body() item: ItemDto): Promise<ItemDto> {
    return this.itemsService.addItem(item);
  }

  @Delete('/:id')
  deleteItem(@Param() { id }: { id: number }): Promise<ItemDto> {
    return this.itemsService.deleteItem(id);
  }

  @Get('/:id')
  getItem(@Param() { id }: { id: number }): Promise<ItemDto> {
    return this.itemsService.getItem(id);
  }

  @Get('/')
  getAllItems(@Query() query): Promise<ItemDto[]> {
    return this.itemsService.getAllItems(query);
  }
}
