import { ItemDto } from 'src/Dto/Item/item.dto';
import { MonsterItemDto } from 'src/Dto/Monster/monster.dto';

export const attributeMonsterLoot = (
  potentialItemDrop: MonsterItemDto[],
): ItemDto[] => {
  const acquiredLoot: ItemDto[] = [];
  potentialItemDrop.forEach((drop) => {
    const randomNumber = Math.random() * 100;
    if (drop.dropRate <= randomNumber) {
      acquiredLoot.push(drop.item);
    }
  });

  return acquiredLoot;
};
