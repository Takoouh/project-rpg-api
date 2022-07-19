import { ItemDto } from 'src/Dto/Item/item.dto';
import { MonsterItemDto } from 'src/Dto/Monster/monster.dto';

export const attributeMonsterLoot = (
  potential_item_drop: MonsterItemDto[],
): ItemDto[] => {
  const acquiredLoot: ItemDto[] = [];
  potential_item_drop.forEach((drop) => {
    const randomNumber = Math.random() * 100;
    if (drop.drop_rate <= randomNumber) {
      acquiredLoot.push(drop.item);
    }
  });

  return acquiredLoot;
};
