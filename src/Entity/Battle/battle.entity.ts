import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('battle')
export class BattleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  characterId: number;

  @Column({ nullable: false })
  monsterId: number;

  @Column({ nullable: false })
  monsterRemainingLife: number;
}
