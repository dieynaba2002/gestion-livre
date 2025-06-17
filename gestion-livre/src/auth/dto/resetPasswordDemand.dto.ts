import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class ResetPasswordDemandDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;
}
