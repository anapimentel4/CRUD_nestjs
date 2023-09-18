import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
//import * as path from 'path'; 

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', // Reemplaza esto con la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, // Habilitar si necesitas enviar credenciales (por ejemplo, cookies)
  };
  app.enableCors(corsOptions);


  await app.listen(3080,()=> {
    console.log('running at port 300 backend ')
  });
}
bootstrap();
