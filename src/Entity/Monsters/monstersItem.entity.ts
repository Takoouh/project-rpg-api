import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MonsterEntity } from './monsters.entity';
import { ItemsEntity } from '../Items/items.entity';

@Entity('monstersItemsList')
export class MonsterItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MonsterEntity, (monster) => monster.potentialItemDrop, {
    cascade: true,
  })
  monster: MonsterEntity;

  @ManyToOne(() => ItemsEntity, (item) => item.id, {
    cascade: true,
    eager: true,
  })
  item: ItemsEntity;

  @Column({ nullable: false })
  dropRate: number;
}
