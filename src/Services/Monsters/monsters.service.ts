import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonsterDto } from 'src/Dto/Monster/monster.dto';
import { MonsterEntity } from 'src/Entity/Monsters/monsters.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonstersService {
  constructor(
    @InjectRepository(MonsterEntity)
    private monstersRepository: Repository<MonsterEntity>,
  ) { }

  addMonster(item: MonsterDto): Promise<MonsterDto> {
    return this.monstersRepository.save(item);
  }

  async deleteMonster(id: number): Promise<MonsterDto> {
    const itemToDelete = await this.monstersRepository.findOne(id);
    return this.monstersRepository.remove(itemToDelete);
  }

  getMonster(id: number): Promise<MonsterDto> {
    const monsterInfo = this.monstersRepository.findOne(id);
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

  getAllMonsters(): Promise<MonsterDto[]> {
    return this.monstersRepository.find();
  }
}
