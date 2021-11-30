import { CharacterDto, CharacterInfoFormattedDto } from '../dto/character.dto';

export const formatCharactersInfos = (charactersInfo: CharacterDto): CharacterInfoFormattedDto => {
  const { strength, intelligence, speed, ...otherInfos } = charactersInfo
  return {
    ...otherInfos,
    stats: {
      strength,
      speed,
      intelligence
    }
  }
}