import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EstablishmentDetailService } from './establishment-detail.service';
import { CreateEstablishmentDetailDto } from './dto/create-establishment-detail.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('establishment-detail')
export class EstablishmentDetailController {
  constructor(
    private readonly establishmentDetailService: EstablishmentDetailService,
  ) {}

  // Create with image upload
  @Post(':foodEstablishmentId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Specify upload directory
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (req, file, callback) => {
        // Only allow image files
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Param('foodEstablishmentId') foodEstablishmentId: number,
    @Body() createEstablishmentDetailDto: CreateEstablishmentDetailDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Pass the file path to the DTO or handle it as needed
    createEstablishmentDetailDto.image = file.path;
    return await this.establishmentDetailService.create(
      createEstablishmentDetailDto,
      foodEstablishmentId,
    );
  }

  // Other CRUD endpoints
  @Get()
  async findAll() {
    return await this.establishmentDetailService.findAll();
  }

  @Get('by-food-establishment/:foodEstablishmentId')
  async findByFoodEstablishmentId(
    @Param('foodEstablishmentId') foodEstablishmentId: number,
  ) {
    return await this.establishmentDetailService.findByFoodEstablishmentId(
      foodEstablishmentId,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.establishmentDetailService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Upload papkasini ko'rsating
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (req, file, callback) => {
        // Faqat rasm fayllarini qabul qilish uchun
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() updateEstablishmentDetailDto: Partial<CreateEstablishmentDetailDto>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      // Fayl mavjudligini tekshirib, yo'lni DTO ga o'rnatamiz
      updateEstablishmentDetailDto.image = file.path;
    }
    return await this.establishmentDetailService.update(
      id,
      updateEstablishmentDetailDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async remove(@Param('id') id: number) {
    return await this.establishmentDetailService.remove(id);
  }
}
