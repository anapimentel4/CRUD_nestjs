import { IsString , IsOptional} from 'class-validator';




export class CreateProfileDto {
    @IsString()
    @IsOptional()
    username: string


    @IsString()
    @IsOptional()
    password: string


  @IsOptional()
  clientId?: string; 
    
}
