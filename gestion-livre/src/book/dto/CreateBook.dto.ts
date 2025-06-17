import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { BookCategory } from "generated/prisma";

export class CreateBookDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly author: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly published: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BookCategory)
  readonly category: BookCategory;

  @ApiProperty({ required: false })
  readonly photoUrl?: string;
}