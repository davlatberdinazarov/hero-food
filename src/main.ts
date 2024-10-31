import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Umumiy API yo'li o'rnatish
  app.setGlobalPrefix('api');

   // CORS ni middleware sifatida o'rnatish
   app.use(cors());
     // CORS ni yoqish
  app.enableCors();

  // Ilovani localhost:8181 portida ishga tushirish
  await app.listen(8181);
}
bootstrap();
