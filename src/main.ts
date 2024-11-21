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

 // .env fayldan PORT o‘zgaruvchisini o‘qib olish
 const PORT = process.env.PORT || 3000; // Agar PORT ko‘rsatilmagan bo‘lsa, 3000 port ishlatiladi.

 // Ilovani belgilangan portda ishga tushirish
 await app.listen(PORT);
 console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
