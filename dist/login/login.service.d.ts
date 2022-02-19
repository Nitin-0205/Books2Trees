import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { AuthVerifyTransaction } from './../Database/Entities/authVerifyTransaction.entity';
import { MailService } from 'src/mail/mail.service';
export declare class LoginService {
    private userRepo;
    private authVerifyTransactionRepo;
    private mailerService;
    constructor(userRepo: Repository<User>, authVerifyTransactionRepo: Repository<AuthVerifyTransaction>, mailerService: MailService);
    password(data: any): Promise<{
        challengeSent: string;
        challengeId: any;
        challengeExp: Date;
        userId: string;
    } | "wrong Password">;
    submitOtp(submitOtpDTO: any): Promise<{
        verification: string;
    }>;
}
