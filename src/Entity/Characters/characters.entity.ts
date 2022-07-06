import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaceEntity } from '../Places/places.entity';
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

  @Column({ default: 0, nullable: false })
  exp_to_level_up: number;

  @Column({ default: 0, nullable: false })
  skill_point: number;

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

  @ManyToOne(() => PlaceEntity, (place) => place.characters)
  place: PlaceEntity;
}
