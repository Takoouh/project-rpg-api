import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterItemsEntity } from './characterItems.entity';

@Entity('characters')
export class CharactersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 1, nullable: false })
  level: number;

  @Column({ default: 0, nullable: false })
  experience: number;

  @Column({ default: 10, nullable: false })
  remaining_life_point: number;

  @Column({ default: 10, nullable: false })
  life_point: number;

  @Column({ default: 0, nullable: false })
  gold: number;

  @Column({ default: 5, nullable: false })
  strength: number;

  @Column({ default: 5, nullable: false })
  speed: number;

  @Column({ default: 5, nullable: false })
  intelligence: number;

  @OneToMany(
    () => CharacterItemsEntity,
    (characterItem) => characterItem.character,
  )
  items: CharacterItemsEntity[];
}