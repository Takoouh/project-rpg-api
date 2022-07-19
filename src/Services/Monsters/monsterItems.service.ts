import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonsterItemDto } from 'src/Dto/Monster/monster.dto';
import { MonsterItemsEntity } from 'src/Entity/Monsters/monstersItem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonsterItemsService {
  constructor(
    @InjectRepository(MonsterItemsEntity)
    private monsterItemsRepository: Repository<MonsterItemsEntity>,
  ) {}

  saveItem(
    monsterId: number,
    itemId: number,
    drop_rate: number,
  ): Promise<MonsterItemDto> {
    return this.monsterItemsRepository.save({
      item: { id: itemId },
      drop_rate,
      monster: { id: monsterId },
    });
  }
}
