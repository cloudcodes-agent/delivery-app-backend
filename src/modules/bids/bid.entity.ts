import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() orderId!: string;
  @Column() userId!: string;
  @Column('float') amount!: number;
  @CreateDateColumn() created_at!: Date;
}
