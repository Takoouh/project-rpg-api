import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('characters')
export class CharactersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 1, nullable: false })
  level: number;

  @Column({ default: 10, nullable: false })
  remaining_life_point: number;

  @Column({ default: 10, nullable: false })
  life_point: number;

  @Column({ default: 5, nullable: false })
  strength: number;

  @Column({ default: 5, nullable: false })
  speed: number;

  @Column({ default: 5, nullable: false })
  intelligence: number;
}
