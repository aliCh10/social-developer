import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const config = new DocumentBuilder()
    .setTitle('API d\'authentification')
    .setDescription('API pour l\'enregistrement et la connexion des utilisateurs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

   // Activer CORS
   app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:4000'], // Allow both origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

 
  await app.listen(3000);
}
bootstrap();
