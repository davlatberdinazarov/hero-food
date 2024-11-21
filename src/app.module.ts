import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { CityModule } from './city/city.module';
import { CategoryModule } from './category/category.module';
import { FoodEstablishmentModule } from './food-establishment/food-establishment.module';
import { PromotionModule } from './promotion/promotion.module';
import { ProfileModule } from './profile/profile.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { FoodModule } from './food/food.module';
import { RatingModule } from './rating/rating.module';
import { EstablishmentDetailModule } from './establishment-detail/establishment-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // uploads papkasiga yo‘l
      serveRoot: '/uploads', // URL orqali kirish
      exclude: ['*/index.html'], // HTML fayllar talab qilinmaydi
    }),
    UsersModule,
    AuthModule,
    RegionModule,
    CityModule,
    CategoryModule,
    FoodEstablishmentModule,
    PromotionModule,
    ProfileModule,
    MenuCategoryModule,
    FoodModule,
    RatingModule,
    EstablishmentDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
