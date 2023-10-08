import { Injectable, BadRequestException , InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { isUUID } from 'class-validator';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger('ProfileService')
constructor(
  @InjectRepository(Profile)
  private readonly profileRepository : Repository<Profile>
){}
  
 async create(createProfileDto: CreateProfileDto) {
   
try {
  const profile = this.profileRepository.create(createProfileDto)
   await this.profileRepository.save(profile)
   return profile 
} catch (error) {
 throw new BadRequestException(error) 
}


  }

  findAll(PaginationDto) {
    const {limit=20, offset=0} = PaginationDto
    return this.profileRepository.find({
      take:limit,
      skip:offset,
      //relaciones 
    });
  }

  async findOne(term: string) {

    let profile:Profile;
    if(isUUID(term)){
      profile= await this.profileRepository.findOneBy({id:term})
    } else {
      const query = this.profileRepository.createQueryBuilder("term")
      profile = await query
      .where('TRIM(UPPER(username))=:username',{
        username:term.toUpperCase().trim(),
      }).getOne()

  } 
  if (!profile)
  throw new NotFoundException(`username not found ${term} not found`);

return profile
}

   ;
  

 async update(id:string, updateProfileDto: UpdateProfileDto) {
  try {
    const existingProfile = await this.profileRepository.findOneBy({id});

    if (!existingProfile) {
      throw new NotFoundException('Profile not found');
    }

    
    this.profileRepository.merge(existingProfile, updateProfileDto);

    
    const updatedProfile = await this.profileRepository.save(existingProfile);

    return updatedProfile;
  } catch (error) {
    this.differentsEerrors(error);
  }
}

 async  remove(id: string) {

    const profile = await this.findOne(id);
    await this.profileRepository.remove(profile)
    return profile;
  }

  private differentsEerrors(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('unexpected error')

  }

}
