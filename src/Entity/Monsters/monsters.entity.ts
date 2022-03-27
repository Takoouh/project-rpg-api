import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MonsterItemsEntity } from './monstersItem.entity';
@Entity('monsters')
export class MonsterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  monster_name: string;

  @Column({ nullable: false })
  life_point: number;

  @Column({ nullable: false })
  strengh: number;

  @Column({ nullable: false })
  speed: number;

  @Column({ nullable: false })
  gold: number;

  @Column({ nullable: false })
  experience: number;

  @OneToMany(() => MonsterItemsEntity, (monstersItems) => monstersItems.monster)
  potentialItemDrop: MonsterItemsEntity[];
}
