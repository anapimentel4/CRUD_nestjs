import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { Profile } from 'src/entities/profile.entity';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, ProfileService],
  imports: [
    TypeOrmModule.forFeature([Client, Profile])
  ]
})
export class ClientsModule {}
