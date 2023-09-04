import { Injectable, BadRequestException  } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { profile } from 'console';

@Injectable()
export class ProfileService {

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

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
