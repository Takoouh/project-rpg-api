import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
