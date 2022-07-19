import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonsterInfoDto, MonsterTableDto } from 'src/Dto/Monster/monster.dto';
import { MonsterEntity } from 'src/Entity/Monsters/monsters.entity';
import { Repository } from 'typeorm';
import { MonsterItemsService } from './monsterItems.service';

@Injectable()
export class MonstersService {
  constructor(
    @InjectRepository(MonsterEntity)
    private monstersRepository: Repository<MonsterEntity>,
    private monsterItemsService: MonsterItemsService,
  ) {}

  async addMonster(monster: MonsterInfoDto): Promise<MonsterInfoDto> {
    const { potential_item_drop, ...monsterInfos } = monster;
    const monsterToAdd = await this.monstersRepository.save(monsterInfos);
    if (potential_item_drop?.length > 0) {
      await potential_item_drop.map(async ({ item, drop_rate }) => {
        await this.monsterItemsService.saveItem(
          monsterToAdd.id,
          item.id,
          drop_rate,
        );
      });
    }
    return await this.monstersRepository.findOne({
      where: { id: monsterToAdd.id },
      relations: ['potential_item_drop'],
    });
  }

  async deleteMonster(id: number): Promise<MonsterTableDto> {
    const monsterToDelete = await this.monstersRepository.findOne(id);
    return this.monstersRepository.remove(monsterToDelete);
  }

  async updateMonster(id: number, newMonstersInfos: any) {
    const monsterId = id;
    await this.monstersRepository.update({ id: monsterId }, newMonstersInfos);
    return this.monstersRepository.findOne({
      where: { monsterId },
      relations: ['potential_item_drop'],
    });
  }

  async addItemToMonster(
    monsterId: number,
    itemId: number,
    dropRate: number,
  ): Promise<MonsterInfoDto> {
    await this.monsterItemsService.saveItem(monsterId, itemId, dropRate);
    return this.monstersRepository.findOne({
      where: { id: monsterId },
      relations: ['potential_item_drop'],
    });
  }

  async getMonster(id: number): Promise<MonsterInfoDto> {
    const monsterInfo = await this.monstersRepository.findOne({
      where: { id },
      relations: ['potential_item_drop'],
    });

    if (!monsterInfo) {
      throw new HttpException(
        {
          status: 500,
          error: `The monster with id ${id} doesn't exist`,
        },
        500,
      );
    }
    return monsterInfo;
  }

  getAllMonsters(): Promise<MonsterTableDto[]> {
    return this.monstersRepository.find();
  }
}
