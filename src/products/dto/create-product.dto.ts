import { IsString , IsNumber,  IsOptional, ValidateNested, IsArray, isNumber, } from "class-validator"




export class CreateProductDto {

    @IsString()
    productName:string

    @IsString()
    sku: string;

    @IsNumber()
    price: number

 

}
