import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/CreateBook.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}
  async createBook(
    createBookDto: CreateBookDto,
    userId: any,
    file: Express.Multer.File,
  ) {
    const { title, author, description, published, category } = createBookDto;

    try {
      const book = await this.prismaService.book.create({
        data: {
          title,
          author,
          description,
          published,
          userId: userId,
          category,
          photoUrl: file?.filename,
        },
      });

      return { message: 'Book created successfully', book };
    } catch (error) {
      console.error('Erreur lors de la création du livre :', error);
      throw new Error('Une erreur est survenue lors de la création du livre');
    }
  }

  async updateBook(
    id: number,
    dto: CreateBookDto,
    userId: number,
    file?: Express.Multer.File,
  ) {
    try {
      const existingBook = await this.prismaService.book.findUnique({
        where: { id },
      });
      if (!existingBook || existingBook.userId !== userId) {
        throw new Error('Unauthorized or book not found');
      }

      return await this.prismaService.book.update({
        where: { id },
        data: {
          ...dto,
          photoUrl: file?.filename || existingBook.photoUrl,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la modification du livre :', error);
      throw new Error('Erreur lors de la modification du livre');
    }
  }

  async deleteBook(id: number, userId: number) {
    try {
      const book = await this.prismaService.book.findUnique({ where: { id } });
      if (!book || book.userId !== userId) {
        throw new Error('Unauthorized or book not found');
      }

      await this.prismaService.book.delete({ where: { id } });
      return { message: 'Livre supprimé avec succès' };
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      throw new Error('Erreur lors de la suppression du livre');
    }
  }
  async getBooks(userId: number) {
    return this.prismaService.book.findMany({
      where: { userId },
      orderBy: { published: 'desc' }, 
    });
  }
}
