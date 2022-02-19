import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { AuthVerifyTransaction } from './../Database/Entities/authVerifyTransaction.entity';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
    async sendUserOtp(
        user:User,
        authVerifyTransaction:AuthVerifyTransaction
    ){
        await this.mailerService.sendMail({
            to: user.username,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Books2Trees! Confirm your Email',
            template: '../otp', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
              name: user.name,
              Otp:authVerifyTransaction.challenge,
            },
          });
    }
}
