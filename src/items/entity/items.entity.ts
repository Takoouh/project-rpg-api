import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('items')
export class ItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  item_name: string;

  @Column({ nullable: true })
  item_desc: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  subtype: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: false })
  strengh: number;

  @Column({ nullable: false })
  speed: number;
}
