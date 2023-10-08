import { Injectable, HttpStatus,HttpException, NotFoundException,  } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid'
import { PaginationDto } from '../common/dtos/pagination.dto';


function generateUniqueSku() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters.charAt(randomIndex);
  }
//console.log(sku)
  return sku;
}


@Injectable()
export class ProductsService {
 constructor(
  @InjectRepository(Product)
  private readonly productRepository:Repository<Product>,

 ){}

 

 async create(createProductDto: CreateProductDto) {
  try {
    const sku = generateUniqueSku();

    const newProduct = this.productRepository.create({
      productName: createProductDto.productName,
      price: createProductDto.price,
      sku: sku, 
    });

    await this.productRepository.save(newProduct);

    return newProduct;
  } catch (error) {
    console.error(error);
    throw new HttpException('Error al crear producto', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  findAll(PaginationDto){
    const {limit=12, offset=0} = PaginationDto
    return this.productRepository.find({
      take:limit,
      skip:offset,
      //relaciones 
    });
  }

  async findOne(term: string) {
    let product: Product;

    if(isUUID(term)){
      product = await this.productRepository.findOneBy({id: term})

    }else{
      const query =this.productRepository.createQueryBuilder("term");
      product = await query
       .where('TRIM(UPPER(sku)) =:sku', {
        sku:term.toUpperCase().trim(),
       }).getOne()
    }
    if (!product)
    throw new NotFoundException(`client with id ${term} not found`);

  return product

  }
 async update(id: string, updateProductDto: UpdateProductDto) {
     const product = await this.productRepository.preload({
      id:id,
      ...updateProductDto,
     });
     if (!product)throw new NotFoundException(`product with ${id} not found`)
     try{
    await this.productRepository.save(product)
    return product
    } catch(error){
      console.log(error)
    }
  }


 async remove(id: string) {
    const productId = await this.findOne(id)
    await this.productRepository.remove(productId)
    return productId
  }
}
