import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CharacterItemsTableDto } from 'src/Dto/Character/characterItem.dto';
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
  ) {}

  @Post('/')
  create(@Body() character: CharacterTableDto): Promise<CharacterTableDto> {
    return this.charactersService.createCharacter(character);
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
  ): Promise<CharacterItemsTableDto> {
    return this.characterItemsService.addItemToCharacter(characterId, itemId);
  }

  @Patch('/:characterId/revive')
  reviveCharacter(
    @Param() { characterId }: { characterId: number },
  ): Promise<CharacterFullInfosDto> {
    return this.charactersService.reviveCharacter(characterId);
  }

  @Patch('/:characterId/rest-in-inn')
  restInInn(
    @Param() { characterId }: { characterId: number },
  ): Promise<CharacterFullInfosDto> {
    return this.charactersService.restInInn(characterId);
  }

  @Patch('/:characterId/attribute-skill-point/:stat')
  attributeSkillPoint(
    @Param()
    { characterId, stat }: { characterId: number; stat: string },
  ): Promise<CharacterFullInfosDto> {
    return this.charactersService.attributeSkillPoint(characterId, stat);
  }

  @Patch('/:characterId/use-item/:itemId')
  useItem(
    @Param('characterId') characterId: string,
    @Param('itemId') itemId: string,
  ): Promise<CharacterFullInfosDto> {
    return this.charactersService.useItem(
      parseInt(characterId),
      parseInt(itemId),
    );
  }
}
