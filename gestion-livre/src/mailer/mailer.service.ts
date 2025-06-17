import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private async transporter() {
    const testAccount = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      ignoreTLS: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    return transport;
  }
  // Methode pour envoyer les mail de confirmation
  async sendSignupConfirmation(userEmail: string) {
    (await this.transporter()).sendMail({
      from: 'app@localhost.com',
      to: userEmail,
      subject: 'Inscription',
      html: "<h3> Confirmation de l'inscription</h3>",
    });
  }

  // Methode pour gerer la recupreration de mot de passe
  async sendResetPassword(userEmail: string, url: string, code: string) {
    (await this.transporter()).sendMail({
      from: 'app@localhost.com',
      to: userEmail,
      subject: 'Reinitialisation de mot de passe',
      html: `
              <a href="${url}">Reset password</a>
              <p>Secret code <strong>${code}</strong></p>
              <p>Le code va expirer dans 15 min</p>
          `,
    });
  }
}
