import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: Users, token: string) {
        
        //https://seven-cloudwalk.herokuapp.com/
        const url = `https://seven-cloudwalk.herokuapp.com/users/verification/${token}`;

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
            return `Email sent for receipt ${user.email}`
        } 
        catch( error ) {
            console.log( error );

            throw new BadRequestException(`Error sending email for receipt ${user.email}`);
        }
    }
}