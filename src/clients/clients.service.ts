import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { validate as isUUID } from 'uuid'

@Injectable()
export class ClientsService {

  private readonly logger = new Logger('ClientsService')

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>

  ) { }

  async create(createClientDto: CreateClientDto) {
    try {
      const client = this.clientRepository.create(createClientDto)
      await this.clientRepository.save(client)
      return client


    } catch (error) {
      this.differentsEerrors(error)
    }

  }

  findAll() {
    return this.clientRepository.find({});
  }

  async findOne(term: string) {

    let client: Client;

    if (isUUID(term)) {
      client = await this.clientRepository.findOneBy({ id: term })
    } else {
      const query = this.clientRepository.createQueryBuilder("term");
      client = await query
        .where('TRIM(UPPER(name)) =:name ', {
          name: term.toUpperCase().trim(),
        }).getOne()

    }

    if (!client)
      throw new NotFoundException(`client with id ${term} not found`);

    return client
  }

  async update(id: string, updateClientDto: UpdateClientDto) {

    const client = await this.clientRepository.preload({
      id: id,
      ...updateClientDto
    })
    if (!client) throw new NotFoundException(`client with ${id} not found`)
 try {
await this.clientRepository.save(client)
return client
  
 } catch (error) {
 this.differentsEerrors(error)  
 }
  }

  async remove(id: string) {

    const clientid = await this.findOne(id);
    await this.clientRepository.remove(clientid)
    return clientid
  }

  //TODO: read MORE ABOUT ERROS  

  private differentsEerrors(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('unexpected error')

  }


}
