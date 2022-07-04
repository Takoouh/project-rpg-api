import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CharactersEntity } from '../Characters/characters.entity';

@Entity('places')
export class PlaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  place_name: string;

  @Column()
  has_inn: boolean;

  @Column({ default: false, nullable: false })
  is_beginning_town: boolean;

  @OneToMany(() => CharactersEntity, (character) => character.place)
  characters: CharactersEntity[];
}
