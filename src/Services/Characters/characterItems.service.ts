import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterFullInfosDto } from 'src/Dto/Character/character.dto';
import { CharacterItemsTableDto } from 'src/Dto/Character/characterItem.dto';
import { CharacterItemsEntity } from 'src/Entity/Characters/characterItems.entity';
import { Repository } from 'typeorm';
import { CharactersService } from './characters.service';

@Injectable()
export class CharacterItemsService {
  constructor(
    @InjectRepository(CharacterItemsEntity)
    private characterItemsRepository: Repository<CharacterItemsEntity>,
    private charactersService: CharactersService,
  ) {}

  async addItemToCharacter(
    characterId: number,
    itemId: number,
  ): Promise<CharacterFullInfosDto> {
    //we check character already has at least one of this item
    const characterItem = await this.characterItemsRepository.findOne({
      where: { characterId, itemId },
    });
    if (!characterItem) {
      await this.characterItemsRepository.save({
        characterId,
        itemId,
        quantity: 1,
      });
    } else {
      await this.characterItemsRepository.update(
        {
          id: characterItem.id,
        },
        {
          quantity: characterItem.quantity + 1,
        },
      );
    }

    return this.charactersService.findCharacter(characterId);
  }

  async getCharacterItems(
    characterId: number,
  ): Promise<CharacterItemsTableDto[]> {
    const characterItems = await this.characterItemsRepository.find({
      where: { characterId },
    });
    return characterItems || [];
  }

  async deleteCharacterItems(
    characterId: number,
  ): Promise<CharacterItemsTableDto[]> {
    const characterItemsToDelete = await this.characterItemsRepository.find({
      where: { characterId },
    });
    return this.characterItemsRepository.remove(characterItemsToDelete);
  }
}
