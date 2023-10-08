import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  productName: string;

  @Column('text') 
  sku: string;

  @Column('float')
  price: number;

 
}