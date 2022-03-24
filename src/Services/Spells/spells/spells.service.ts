import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpellDto } from 'src/Dto/Spell/spell.dto';
import { SpellEntity } from 'src/Entity/Spells/spell.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpellsService {
  constructor(
    @InjectRepository(SpellEntity)
    private spellsRepository: Repository<SpellEntity>,
  ) { }

  addSpell(spell: SpellDto): Promise<SpellDto> {
    return this.spellsRepository.save(spell);
  }

  async deleteSpell(id: number): Promise<SpellDto> {
    const spellToDelete = await this.spellsRepository.findOne(id);
    return this.spellsRepository.remove(spellToDelete);
  }

  getSpell(id: number): Promise<SpellDto> {
    return this.spellsRepository.findOne(id);
  }

  async getAllSpells(query: { [key: string]: string }): Promise<SpellDto[]> {
    let response = await this.spellsRepository.find();
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
