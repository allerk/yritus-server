import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataHelper } from './helpers/AppDataHelper';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await AppDataHelper.SetupData();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
