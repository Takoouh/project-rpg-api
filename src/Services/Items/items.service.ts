import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from '../../Dto/Item/item.dto';
import { ItemsEntity } from '../../Entity/Items/items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsEntity)
    private itemsRepository: Repository<ItemsEntity>,
  ) {}

  addItem(item: ItemDto): Promise<ItemDto> {
    return this.itemsRepository.save(item);
  }

  async deleteItem(id: number): Promise<ItemDto> {
    const itemToDelete = await this.itemsRepository.findOne(id);
    return this.itemsRepository.remove(itemToDelete);
  }

  getItem(id: number): Promise<ItemDto> {
    return this.itemsRepository.findOne(id);
  }

  async getAllItems(query: { [key: string]: string }): Promise<ItemDto[]> {
    let response = await this.itemsRepository.find();
    const queryList = Object.keys(query);
    if (queryList.length > 0) {
      queryList.map((queryKey) => {
        response = response.filter(
          (item) => item[queryKey] === query[queryKey],
        );
      });
    }
    return response;
  }
}
