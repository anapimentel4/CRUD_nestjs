import { Client } from 'src/clients/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{
    unique:true
  })
  username: string;

  @Column('text')
  password: string;

  @ManyToOne(() => Client, client => client.profiles)
  client: Client;


  @OneToMany(() => Product, product => product.profile)
  products: Product[];
}