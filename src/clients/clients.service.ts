import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { validate as isUUID } from 'uuid'
import { Profile } from 'src/entities/profile.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ClientsService {

  private readonly logger = new Logger('ClientsService')

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
   
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>

  ) { }

  async create(createClientDto: CreateClientDto) {
    try {
      const { profiles = [], ...clientDetail } = createClientDto;
  
      
      const client = this.clientRepository.create({
        ...clientDetail,
        profiles: [],
      });
  
      
      await this.clientRepository.save(client);
  
      // Asigna los perfiles al cliente después de que se haya creado
      client.profiles = profiles.map(profileDto => {
        const newProfile = new Profile();
        newProfile.username = profileDto.username;
        newProfile.password = profileDto.password;
        // Excluye la propiedad 'client' para evitar la referencia circular
        delete newProfile.client;
        return newProfile;
      });
  
      // Guarda el cliente actualizado con los perfiles en la base de datos
      await this.clientRepository.save(client);
  
      return client;
    } catch (error) {
      this.differentsEerrors(error);
    }
  }


  findAll(PaginationDto) {
    const {limit=12, offset=0} = PaginationDto
    return this.clientRepository.find({
      take:limit,
      skip:offset,
      //relaciones 
    });
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
      ...updateClientDto,
      profiles: [], 
    });

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
    clientid.profiles = [];

    await this.clientRepository.remove(clientid);
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
