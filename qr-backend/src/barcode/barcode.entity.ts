import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BarcodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  public content: string;
}
