import { Body, ConflictException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { SigninDto } from './dto/signin.dto';
import * as speakeasy from 'speakeasy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signup(SignupDto: SignupDto) {
    const { email, password, username } = SignupDto;

    // Verfier si l'utilisateur existe déjà
    const user = await this.prismaService.user.findUnique({
      where: { email: SignupDto.email },
    });
    if (user) {
      throw new ConflictException('Cet utilisateur existe déjà.');
    }

    // hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // enregistrer l'utilisateur dans la base de données
    await this.prismaService.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // envoyer un email de confirmation
    await this.mailerService.sendSignupConfirmation(email);

    // Retourner une réponse de succès
    return { data: 'Utilisateur créé avec succès' };
  }

  async signin(SigninDto: SigninDto) {
    const { email, password } = SigninDto;
    // Vérifier si l'utilisateur existe
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new ConflictException('Utilisateur non trouvé');
    }
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException('Login ou Mot de passe incorrect');
    }
    // Retourner le token
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: this.configService.get('SECRET_KEY'),
    });
    return {
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    };
  }

  // async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
  //   const { email } = resetPasswordDemandDto;
  //   // Verifier si  l'utilisateur est deja inscrit
  //   const user = await this.prismaService.user.findUnique({ where: { email } });
  //   if (!user) throw new NotFoundException('Utilisateur introuvable');
  //   const code = speakeasy.totp({
  //     secret: this.configService.get<string>('OTP_CODE')!,
  //     digits: 5,
  //     step: 60 * 15,
  //     encoding: 'base32',
  //   });
  //   const url = 'https://localhost:3000/auth/reset-password-conformation'; //url front
  //   await this.mailerService.sendResetPassword(email, url, code);
  //   return {
  //     data: 'Un e-mail de réinitialisation du mot de passe a été envoyé',
  //   };
  // }
}
