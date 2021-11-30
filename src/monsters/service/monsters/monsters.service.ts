import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonsterDto } from 'src/monsters/dto/monster.dto';
import { MonsterEntity } from 'src/monsters/entity/monsters.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonstersService {
  constructor(
    @InjectRepository(MonsterEntity)
    private monstersRepository: Repository<MonsterEntity>
  ) { }

  addMonster(item: MonsterDto): Promise<MonsterDto> {
    return this.monstersRepository.save(item)
  }

  async deleteMonster(id: number): Promise<MonsterDto> {
    const itemToDelete = await this.monstersRepository.findOne(id)
    return this.monstersRepository.remove(itemToDelete)
  }

  getMonster(id: number): Promise<MonsterDto> {
    return this.monstersRepository.findOne(id)
  }

  getAllMonsters(): Promise<MonsterDto[]> {
    return this.monstersRepository.find()
  }
}
