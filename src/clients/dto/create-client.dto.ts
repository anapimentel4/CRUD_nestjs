import { IsString , IsEmail, MinLength, IsNotEmpty} from "class-validator"

export class CreateClientDto {


@IsString()
@MinLength(1)
name:string 


@IsNotEmpty()
@IsEmail()
email:string


}
