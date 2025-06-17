import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './mailer/mailer.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}), AuthModule, PrismaModule, MailerModule, BookModule],
})
export class AppModule {}
