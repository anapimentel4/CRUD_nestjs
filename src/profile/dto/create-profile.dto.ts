import { IsString ,IsNotEmpty } from 'class-validator';

export class CreateProfileDto {


    @IsString()
    @IsNotEmpty()
    username: string


    @IsString()
    @IsNotEmpty()
    password: string
}
