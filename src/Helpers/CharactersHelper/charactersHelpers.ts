import {
  CharacterFullInfosDto,
  CharacterTableWithItemsDto,
} from '../../Dto/Character/character.dto';

export const formatCharactersInfos = (
  characterInfo: CharacterTableWithItemsDto,
): CharacterFullInfosDto => {
  const { strength, intelligence, speed, ...otherInfos } = characterInfo;
  return {
    ...otherInfos,
    stats: {
      strength,
      speed,
      intelligence,
    },
  };
};
