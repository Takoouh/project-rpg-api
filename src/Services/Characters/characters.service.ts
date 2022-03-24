import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CharacterDto,
  CharacterInfoFormattedDto,
} from '../../Dto/Character/character.dto';
import { CharactersEntity } from '../../Entity/Characters/characters.entity';
import { formatCharactersInfos } from '../../Helpers/CharactersHelper/charactersHelpers';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharactersEntity)
    private charactersRepository: Repository<CharactersEntity>,
  ) { }

  create(character: CharacterDto): Promise<CharacterDto> {
    return this.charactersRepository.save(character);
  }

  async deleteCharacter(id: number): Promise<CharacterDto> {
    const characterToDelete = await this.charactersRepository.findOne(id);
    return this.charactersRepository.remove(characterToDelete);
  }

  async findCharacter(id: number): Promise<CharacterInfoFormattedDto> {
    const characterInfo = await this.charactersRepository.findOne(id);
    return formatCharactersInfos(characterInfo);
  }

  findAll(): Promise<CharacterDto[]> {
    return this.charactersRepository.find();
  }
}
