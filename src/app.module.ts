import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RegionService } from './region/region.service';
import { RegionController } from './region/region.controller';
import { RegionModule } from './region/region.module';
import { CityModule } from './city/city.module';
import { CategoryModule } from './category/category.module';
import { FoodEstablishmentModule } from './food-establishment/food-establishment.module';


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
        // do NOT use synchronize: true in real projects
        synchronize: true,
      }) 
    }),
    UsersModule,
    AuthModule,
    RegionModule,
    CityModule,
    CategoryModule,
    FoodEstablishmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
