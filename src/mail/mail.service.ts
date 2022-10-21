import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Users, token: string) {
    let _url = `https://seven-cloudwalk.herokuapp.com/users/verification/${token}`;
    if (process.env.NODE_ENV === 'development') {
      _url = `http://localhost:3500/users/verification/${token}`;
    }

    /*
        console.log( 'NODE_ENV:', process.env.NODE_ENV );
        console.log( 'url:', _url );
        */

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Teste App - Confirm your Email',
        template: './confirmation',
        context: {
          name: user.nickname,
          url: _url,
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
}
