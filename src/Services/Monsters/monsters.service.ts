import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonsterInfoDto, MonsterTableDto } from 'src/Dto/Monster/monster.dto';
import { MonsterEntity } from 'src/Entity/Monsters/monsters.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonstersService {
  constructor(
    @InjectRepository(MonsterEntity)
    private monstersRepository: Repository<MonsterEntity>,
  ) { }

  addMonster(item: MonsterTableDto): Promise<MonsterTableDto> {
    return this.monstersRepository.save(item);
  }

  async deleteMonster(id: number): Promise<MonsterTableDto> {
    const monsterToDelete = await this.monstersRepository.findOne(id);
    return this.monstersRepository.remove(monsterToDelete);
  }

  async updateMonster(id: number, newMonstersInfos: any) {
    const monsterId = id;
    await this.monstersRepository.update({ id: monsterId }, newMonstersInfos);

    return this.monstersRepository.findOne(monsterId);
  }

  async getMonster(id: number): Promise<MonsterInfoDto> {
    const monsterInfo = await this.monstersRepository.findOne({
      where: { id },
      relations: ['potentialItemDrop'],
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
