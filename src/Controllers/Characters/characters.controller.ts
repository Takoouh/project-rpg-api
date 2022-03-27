import { Body, Param, Controller, Get, Post, Delete } from '@nestjs/common';
import { CharacterItemsService } from 'src/Services/Characters/characterItems.service';
import {
  CharacterTableDto,
  CharacterFullInfosDto,
  CharacterMinimumInfosDto,
} from '../../Dto/Character/character.dto';
import { CharactersService } from '../../Services/Characters/characters.service';

@Controller('characters')
export class CharactersController {
  constructor(
    private charactersService: CharactersService,
    private characterItemsService: CharacterItemsService,
  ) { }

  @Post('/')
  create(@Body() character: CharacterTableDto): Promise<CharacterTableDto> {
    return this.charactersService.create(character);
  }

  @Delete('/:id')
  deleteCharacter(@Param() { id }: { id: number }): Promise<CharacterTableDto> {
    return this.charactersService.deleteCharacter(id);
  }

  @Get('/:id')
  findCharacter(
    @Param() { id }: { id: number },
  ): Promise<CharacterFullInfosDto> {
    return this.charactersService.findCharacter(id);
  }

  @Get('/')
  async findAll(): Promise<CharacterMinimumInfosDto[]> {
    const charactersList = await this.charactersService.findAll();
    return charactersList.map(({ id, name, level }) => ({
      id,
      name,
      level,
    }));
  }

  @Post('/:characterId/addItem/:itemId')
  addItemToCharacter(
    @Param() { characterId, itemId }: { characterId: number; itemId: number },
  ): Promise<CharacterFullInfosDto> {
    return this.characterItemsService.addItemToCharacter(characterId, itemId);
  }
}
