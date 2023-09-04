import { Product } from 'src/products/entities/product.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'

@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id:string 

    @Column('text',{
        unique:true
    })
    name: string;

    @Column('text',{
        unique:true
    })
    email: string;

    @OneToMany(() => Profile, profile => profile.client)
    profiles: Profile[];

    @OneToMany(() => Product, product => product.client)
    products: Product[];
}