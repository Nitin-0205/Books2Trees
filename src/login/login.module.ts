import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthVerifyTransaction } from 'src/Database/Entities/authVerifyTransaction.entity';
import { MailModule } from 'src/mail/mail.module';
import { User } from 'src/users/users.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,AuthVerifyTransaction]),MailModule],

controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
