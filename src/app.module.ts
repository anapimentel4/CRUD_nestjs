import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { ProfileModule } from './profile/profile.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),

    ProductsModule,

    ClientsModule,

    ProfileModule,

    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
