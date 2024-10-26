import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Umumiy API yo'li o'rnatish
  app.setGlobalPrefix('api');

  // Ilovani localhost:8181 portida ishga tushirish
  await app.listen(8181);
}
bootstrap();
