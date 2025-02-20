import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/common/filters/GlobalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.enableCors({
  //   origin: [
  //     '*',
  //   ],
  //   methods: ["GET", "POST"],
  //   credentials: true,

  // });
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
    .addTag('sports')
    .addTag('tournament')
    .addTag('season')
    .addTag('club')
    .addTag('team')
    .addTag('player')
    .addTag('venue')
    .addTag('referee')
    .addTag('coach')
    .addTag('match')
    .addTag('match-events')
    .addTag('matchday')
    .addTag('news')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Aplicando o filtro global de exceções
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(4000);
}
bootstrap();
