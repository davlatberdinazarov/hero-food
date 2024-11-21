import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // .env o‘zgaruvchilarni yuklash
  const app = await NestFactory.create(AppModule);

  // Umumiy API yo'li
  app.setGlobalPrefix('api');

  // CORS ni yoqish
  app.enableCors();

  // .env fayldan PORT ni olish
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
