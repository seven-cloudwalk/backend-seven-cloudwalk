import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Users, token: string) {
    const url = `http://localhost:3500/users/verification/${token}`;

<<<<<<< HEAD
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
=======
    async sendUserConfirmation(user: Users, token: string) {
        
        //const url = `https://localhost:3500/users/verification/${token}`;
        const url = `https://seven-cloudwalk.herokuapp.com/users/verification/${token}`;
>>>>>>> aa0d26b1c7a0c5862fe5540359372e16a5f6b235

      throw new BadRequestException(
        `Error sending email for receipt ${user.email}`,
      );
    }
  }
}
