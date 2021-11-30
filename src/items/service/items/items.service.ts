import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from 'src/items/dto/item.dto';
import { ItemsEntity } from 'src/items/entity/items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsEntity)
    private itemsRepository: Repository<ItemsEntity>
  ) { }

  addItem(item: ItemDto): Promise<ItemDto> {
    return this.itemsRepository.save(item)
  }

  async deleteItem(id: number): Promise<ItemDto> {
    const itemToDelete = await this.itemsRepository.findOne(id)
    return this.itemsRepository.remove(itemToDelete)
  }

  getItem(id: number): Promise<ItemDto> {
    return this.itemsRepository.findOne(id)
  }

  getAllItems(): Promise<ItemDto[]> {
    return this.itemsRepository.find()
  }
}
