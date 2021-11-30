import { Body, Param, Controller, Get, Post, Delete } from '@nestjs/common';
import { CharacterDto, CharacterInfoFormattedDto } from '../dto/character.dto';
import { CharactersService } from '../service/characters/characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) { }

  @Post("/")
  create(@Body() character: CharacterDto): Promise<CharacterDto> {
    return this.charactersService.create(character);
  }

  @Delete("/:id")
  deleteCharacter(@Param() { id }: { id: number }): Promise<CharacterDto> {
    return this.charactersService.deleteCharacter(id);
  }

  @Get("/:id")
  findCharacter(@Param() { id }: { id: number }): Promise<CharacterInfoFormattedDto> {
    return this.charactersService.findCharacter(id);
  }

  @Get("/")
  findAll(): Promise<CharacterDto[]> {
    return this.charactersService.findAll();
  }
}
