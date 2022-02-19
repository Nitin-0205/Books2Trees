import { HttpCode, HttpException, HttpStatus, Injectable, Redirect, Res } from '@nestjs/common';
import { Cron, CronExpression, } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { NewBook } from './book.entity';
import { createDTO } from './create.dto';

@Injectable()
export class BookService {
    constructor(@InjectRepository(NewBook) private repo: Repository<NewBook>) {
    }
    async getAllBooks(userId) {
        return this.repo.find({User_Id:userId});
    }

    async createBook(createbookDto: createDTO) {

        const book: NewBook = new NewBook();

        const {User_Id, Book_title, Edition, Author, Publication, BookForYear, Branch, CoverImage, FileName } = createbookDto;
        book.User_Id = User_Id;
        book.Book_title = Book_title.toLowerCase();
        book.Edition = Edition;
        book.Author = Author.toLowerCase();
        book.Publication = Publication.toLowerCase();
        book.BookForYear = BookForYear.toLowerCase();
        book.Branch = Branch.toLowerCase();
        book.CoverImage = CoverImage;
        book.FileName = FileName;

        this.repo.create();
        const resul = await this.repo.save(book);
        return resul
    }

    @Cron('* * * * * *')
    async updateBookStatus() {
        const result = await getRepository(NewBook)
            .createQueryBuilder()
            .update()
            .set({ Status: "PUBLISHED" })
            .where("Upload_Date <= (NOW() - INTERVAL 1 DAY) && Status = 'PENDING'")
            .execute()

        // console.log(result)    
        
    }

    getBookByName(userId,bookName) {
        try {
            return this.repo.find({User_Id:userId, Book_title: bookName });
        } catch (err) {
            throw err;
        }
    }

    async getBookbyId(Id) {
        try {
            const val = await this.repo.findOneOrFail({ Id: Id })
            if (val.Status === "PENDING") {
                const now = new Date().getTime();
                val.Upload_Date.setDate(val.Upload_Date.getDate() + 1)
                const timeleft = val.Upload_Date.getTime() - now;

                // var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeleft) / (1000 * 60 * 60));
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

                const diffTime = hours + ":" + minutes + ":" + seconds
                val['TimeLeft'] = diffTime;
            } else {
                val['TimeLeft'] = '';
            }
            val["uploadDate"] = (val.Upload_Date.getMonth() + 1) + '/' + val.Upload_Date.getDate() + '/' + val.Upload_Date.getFullYear()
            return val;
        } catch (err) {
        }
    }
    async getBookStatus(userId,Status) {
        // console.log(this.repo.find({Status:Status}))
        return this.repo.find({User_Id:userId , Status: Status });
    }
    async deleteBookById(BookId) {
        let found = await this.repo.findOne({ Id: BookId })
        if (found) {
            let deleted = await this.repo.delete({ Id: BookId });
            const fs = require('fs')
            const path = './uploads/BookFiles/' + found.FileName;

            try {
                fs.unlinkSync(path)
            } catch (err) {
                throw err;
            }
        }else{
            throw new HttpException("Failed To Delete", HttpStatus.NOT_FOUND)
        }

    }

    async getBookPdf(BookId) {
        try {
            const bookDetail = await this.repo.findOneOrFail({ Id: BookId })
            return await bookDetail.FileName;
        } catch (err) {
            throw err
        }
    }


}
