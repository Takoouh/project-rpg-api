import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
