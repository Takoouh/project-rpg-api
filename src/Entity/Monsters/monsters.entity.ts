import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MonsterItemsEntity } from './monstersItem.entity';
@Entity('monsters')
export class MonsterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  monster_name: string;

  @Column({ nullable: false })
  life_points: number;

  @Column({ nullable: false })
  strength: number;

  @Column({ nullable: false })
  speed: number;

  @Column({ nullable: false })
  gold: number;

  @Column({ nullable: false })
  experience: number;

  @OneToMany(() => MonsterItemsEntity, (monstersItems) => monstersItems.monster)
  potential_item_drop: MonsterItemsEntity[];
}
