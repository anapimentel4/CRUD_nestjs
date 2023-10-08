import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional, IsArray, } from "class-validator"
import { Profile } from "src/entities/profile.entity";


export class CreateClientDto {


    @IsString()
    @MinLength(1)
    name: string


    @IsNotEmpty()
    @IsEmail()
    email: string


    @IsOptional()
    @IsArray()
    profiles?: Profile[];

}
