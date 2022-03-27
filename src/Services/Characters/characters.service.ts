import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CharacterTableDto,
  CharacterFullInfosDto,
  CharacterEditInfoDto,
  CharacterMinimumInfosDto,
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

  create(character: CharacterTableDto): Promise<CharacterTableDto> {
    return this.charactersRepository.save(character);
  }

  async deleteCharacter(id: number): Promise<CharacterTableDto> {
    const characterToDelete = await this.charactersRepository.findOne(id);
    return this.charactersRepository.remove(characterToDelete);
  }

  async updateCharacter(id: number, newCharacterInfos: CharacterEditInfoDto) {
    return this.charactersRepository.update({ id }, newCharacterInfos);
  }

  async findCharacter(id: number): Promise<CharacterFullInfosDto> {
    const characterInfo = await this.charactersRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!characterInfo) {
      throw new HttpException(
        {
          status: 500,
          error: `The character with id ${id} doesn't exist`,
        },
        500,
      );
    }
    return formatCharactersInfos(characterInfo);
  }

  findAll(): Promise<CharacterMinimumInfosDto[]> {
    return this.charactersRepository.find();
  }
}
