import { Client } from 'src/clients/entities/client.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  productName: string;

  @Column()
  sku: number;

  @Column('float')
  price: number;

  @ManyToOne(
    () => Client, client => client.products)
  client: Client;

  @ManyToOne(
    () => Profile, profile => profile.products)
  profile: Profile;

}