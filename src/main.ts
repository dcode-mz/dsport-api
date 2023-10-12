import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('dsport - Mozambique Sports API Documentation')
    .setDescription(
      'Welcome to the official documentation of the dsport Mozambique Sports API. This API has been created to provide information and functionality related to the world of sports in Mozambique. Through this API, you will have access to a variety of resources, including information about sports events, clubs, athletes, statistics, and much more.',
    )
    .setVersion('1.0')
    .addTag('sport')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(4000);
}
bootstrap();
