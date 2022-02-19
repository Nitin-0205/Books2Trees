import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/users.entity';
import { AuthVerifyTransaction } from './../Database/Entities/authVerifyTransaction.entity';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserOtp(user: User, authVerifyTransaction: AuthVerifyTransaction): Promise<void>;
}
