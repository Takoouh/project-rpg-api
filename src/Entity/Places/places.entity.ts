import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('places')
export class PlaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  place_name: string;

  @Column()
  hasInn: boolean;
}
