import { Profile } from 'src/entities/profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {
        unique: true
    })
    name: string;

    @Column('text', {
        unique: true
    })
    email: string;



    @OneToMany(
        () => Profile,
        (profile) => profile.client,
        { cascade: true }
    )
    profiles?: Profile[];



}