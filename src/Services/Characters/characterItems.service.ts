import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterItemsTableDto } from 'src/Dto/Character/characterItem.dto';
import { CharacterItemsEntity } from 'src/Entity/Characters/characterItems.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterItemsService {
  constructor(
    @InjectRepository(CharacterItemsEntity)
    private characterItemsRepository: Repository<CharacterItemsEntity>,
  ) {}

  async addItemToCharacter(
    characterId: number,
    itemId: number,
  ): Promise<CharacterItemsTableDto> {
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

    return this.characterItemsRepository.findOne({
      where: { characterId, itemId },
    });
  }

  async getCharacterItems(
    characterId: number,
  ): Promise<CharacterItemsTableDto[]> {
    const characterItems = await this.characterItemsRepository.find({
      where: { characterId },
    });
    return characterItems || [];
  }

  /**
   * Delete all items from Character inventory
   * @param {number} characterId
   * @returns {Promise<CharacterItemsTableDto[]>}
   */
  async deleteCharacterItems(
    characterId: number,
  ): Promise<CharacterItemsTableDto[]> {
    const characterItemsToDelete = await this.characterItemsRepository.find({
      where: { characterId },
    });
    return this.characterItemsRepository.remove(characterItemsToDelete);
  }

  /**
   * Reduce quantity of a specific item from Character inventory
   * - delete line if quantity is about to be 0
   * @param {number} characterId
   * @param {number} itemId
   * @returns {Promise<CharacterItemsTableDto[]>}
   */
  async deleteCharacterItem(
    characterId: number,
    itemId: number,
  ): Promise<CharacterItemsTableDto[]> {
    const characterItemsToDelete = await this.characterItemsRepository.findOne({
      where: { characterId, itemId },
    });
    if (characterItemsToDelete.quantity === 1) {
      return this.characterItemsRepository.remove([characterItemsToDelete]);
    } else {
      this.characterItemsRepository.update(
        {
          id: characterItemsToDelete.id,
        },
        {
          quantity: characterItemsToDelete.quantity - 1,
        },
      );
    }
  }
}
