import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import {NewBook} from './book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewBook])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
