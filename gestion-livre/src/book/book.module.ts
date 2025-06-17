import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${uuidv4()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  ],
})
export class BookModule {}

