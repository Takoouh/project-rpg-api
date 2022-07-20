import {
  CharacterEditInfoDto,
  CharacterFullInfosDto,
  CharacterTableWithItemsDto,
} from 'src/Dto/Character/character.dto';

/**
 * Resolve effect depending on effectName
 * @param {string} effectName
 * @param {CharactersEntity} character
 * @returns {CharactersEntity} Character with effect resolved
 */
export const resolveCharacterEffects = (
  effectName: string,
  character: CharacterTableWithItemsDto,
): CharacterEditInfoDto => {
  const {
    name,
    level,
    experience,
    exp_to_level_up,
    remaining_life_points,
    skill_points,
    life_points,
    gold,
    strength,
    speed,
    intelligence,
  } = character;
  const updatedCharacter: CharacterEditInfoDto = {
    name,
    level,
    experience,
    exp_to_level_up,
    remaining_life_points,
    skill_points,
    life_points,
    gold,
    strength,
    speed,
    intelligence,
  };

  switch (effectName) {
    case 'HEAL10': {
      updatedCharacter.remaining_life_points += 10;
      if (
        updatedCharacter.remaining_life_points > updatedCharacter.life_points
      ) {
        updatedCharacter.remaining_life_points = updatedCharacter.life_points;
      }
    }
  }

  return updatedCharacter;
};
