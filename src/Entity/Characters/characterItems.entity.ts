import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemsEntity } from '../Items/items.entity';
import { CharactersEntity } from './characters.entity';

@Entity('characterItems')
export class CharacterItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CharactersEntity, (character) => character.items, {
    cascade: true,
  })
  character: CharactersEntity;

  @Column({ nullable: false })
  characterId: number;

  @ManyToOne(() => ItemsEntity, (item) => item.id, {
    cascade: true,
    eager: true,
  })
  item: ItemsEntity;

  @Column({ nullable: false })
  itemId: number;

  @Column({ nullable: false })
  quantity: number;
}
