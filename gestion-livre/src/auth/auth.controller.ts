import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';


@ApiTags('Authentification')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() SignupDto: SignupDto) {
    return this.authService.signup(SignupDto);
  }

  @Post('signin')
  login(@Body() SigninDto: SigninDto) {
    return this.authService.signin(SigninDto);
  }

  // @Post('reset-password')
  // resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
  //   return this.authService.resetPasswordDemand(resetPasswordDemandDto);
  // }
}

