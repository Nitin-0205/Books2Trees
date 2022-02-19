import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { ChangePassWordController } from './change-pass-word.controller';
import { ChangePassWordService } from './change-pass-word.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [ChangePassWordController],
  providers: [ChangePassWordService]
})
export class ChangePassWordModule {}
