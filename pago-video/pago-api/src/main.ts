import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImATeapotException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const whitelist = [
    '*',
    'http://localhost:3002'
  ];

  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      origin: function (origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }
        if (
          whitelist.includes(origin) ||
          !!origin.match('localhost:3002')
        ) {
          console.log('allowed cors for:', origin);
          callback(null, true);
        } else {
          console.log('blocked cors for:', origin);
          callback(new ImATeapotException('Not allowed by CORS'), false);
        }
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('User')
    .setDescription('The User API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8735);
}
bootstrap();
