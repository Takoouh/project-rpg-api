import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  subtype: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  selling_price: number;

  @Column({ nullable: true })
  effect: string;
}
