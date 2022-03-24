import {
  CharacterDto,
  CharacterInfoFormattedDto,
} from '../../Dto/Character/character.dto';

export const formatCharactersInfos = (
  charactersInfo: CharacterDto,
): CharacterInfoFormattedDto => {
  const { strength, intelligence, speed, ...otherInfos } = charactersInfo;
  return {
    ...otherInfos,
    stats: {
      strength,
      speed,
      intelligence,
    },
  };
};
