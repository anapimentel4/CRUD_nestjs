import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Client } from './client.entity';

@Entity()


export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  username: string

  @Column('text')
  password: string;


  @ManyToOne(
    () => Client,
    (client) => client.profiles, { onDelete: 'SET NULL' })
  client: Client;
}


