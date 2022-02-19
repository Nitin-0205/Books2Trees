import { Controller, Get, Redirect, Query, Param, HttpException, HttpStatus, Post, Body, UseInterceptors, UploadedFile, Delete, Res, StreamableFile, HttpCode, Header, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { BookService } from './book.service';
import { createDTO } from './create.dto';
import { PdfHelper } from './PdfHelper';

@Controller('/book')
export class BookController {
    constructor(private bookService: BookService) {
    }

    @Post()
    getAllBooks(@Body() data) {
        // console.log(data.userId)
        return this.bookService.getAllBooks(data.userId);
    }

    @Post("/NewBook")
    @UseInterceptors(FileFieldsInterceptor([
        {
            name: "CoverImage",
            maxCount: 1,
        },
        {
            name: "file",
            maxCount: 1,
        }
    ],
        {
            storage:diskStorage({
                destination:PdfHelper.destinationPath,
                filename: PdfHelper.customFileName,
            })
        }
    ))
    async addnewBook(
        @UploadedFiles()
        files:{CoverImage: Express.Multer.File,
            file: Express.Multer.File
        },
        @Body() data: createDTO) {
        data.FileName =files.file[0].filename;
        data.CoverImage = files.CoverImage[0].filename;
        console.log(data.FileName)
        console.log(data.CoverImage)
        return await this.bookService.createBook(data);
    }

    @Get('/pdfFile/:bookId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/pdf')
    async getBookPdf(@Param('bookId') Id: number) {
        try{
            const pdfFileName = await this.bookService.getBookPdf(Id);
        // console.log("./uploads/" + pdfFileName)
        const file = createReadStream("./uploads/BookFiles/" + pdfFileName);
        return new StreamableFile(file);
        }catch(e){
            throw new HttpException({message:"Book Not Found"},HttpStatus.NOT_FOUND)
        }
    }

    // @Get('/error')
    // getBookError() {
    //     throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    // }

    @Get('/bookInfo/:bookId')
    getBookById(
        @Param('bookId') Id: number){
        // console.log(this.bookService.getBookbyId(Id))
        return this.bookService.getBookbyId(Id);
    }

    @Post('/publish/search/:bookName')
    getBookByName(
        @Param('bookName') bookName:string,
        @Body() data) {
        // console.log(this.bookService.getBookByName(bookName));
        // console.log(data.userId)
        return this.bookService.getBookByName(data.userId,bookName);
    }

    @Post('/publish/:bookStatus')
    getBookStatus(
        @Param('bookStatus') bookStatus: string,
        @Body() data) {
        return this.bookService.getBookStatus(data.userId,bookStatus);
    }

    @Delete('/delete/:bookId')
    deleteBookById(@Param('bookId') bookId: number) {
        this.bookService.deleteBookById(bookId);
    }

}
