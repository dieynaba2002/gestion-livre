import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/CreateBook.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('PhotoUrl'))
  @ApiBearerAuth()
  @Post('create')
  createBook(
    @Body() createBookDto: CreateBookDto,
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = request.user?.['id'];
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    return this.bookService.createBook(createBookDto, userId, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('PhotoUrl'))
  @ApiBearerAuth()
  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const userId = request.user?.['id'];
    return this.bookService.updateBook(+id, updateBookDto, userId, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  deleteBook(@Param('id') id: string, @Req() request: Request) {
    const userId = request.user?.['id'];
    return this.bookService.deleteBook(+id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('list')
  getBooks(@Req() request: Request) {
    const userId = request.user?.['id'];
    return this.bookService.getBooks(userId);
  }
}
