import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spell')
export class SpellEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  spell_name: string;

  @Column({ nullable: false })
  spell_rank: string;

  @Column({ nullable: false })
  spell_type: string;

  @Column({ nullable: false })
  cost: number;

  @Column({ nullable: true })
  effect: string;
}
