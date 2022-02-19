import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';

import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './notification/notification.module';
import { ChangePassWordModule } from './change-pass-word/change-pass-word.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'books',
      autoLoadEntities:true,
      synchronize: true,
    }),
    BookModule,UsersModule, AuthModule, ConfigModule.forRoot(), LoginModule, MailModule,ScheduleModule.forRoot(), NotificationModule, ChangePassWordModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
