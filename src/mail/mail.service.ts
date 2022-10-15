import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Users } from 'src/users/entities/user.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Users, token: string) {

    //const url = `https://localhost:3500/users/verification/${token}`;
    //const url = `https://seven-cloudwalk.herokuapp.com/users/verification/${token}`;


    const url = `http://localhost:3500/users/verification/${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Teste App - Confirm your Email',
        template: './confirmation',
        context: {
          name: user.nickname,
          url,
        },
      });
      return `Email sent for receipt ${user.email}`;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(
        `Error sending email for receipt ${user.email}`,
      );
    }
  }


  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const url = `https://seven-cloudwalk.herokuapp.com/users/recovery/${email}`;

    const user = await this.mailerService.sendMail({});

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    user.recoverToken = randomBytes(32).toString('hex');
    await user.save();

    const mail = {
      to: user.email,
      subject: 'Recuperação de senha',
      template: './recovery-password',
      context: {
        token: user.recoverToken,
        url,
      },
    };
    await this.mailerService.sendMail(mail);
  }
}
