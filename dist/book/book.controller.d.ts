/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { BookService } from './book.service';
import { createDTO } from './create.dto';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    getAllBooks(data: any): Promise<import("./book.entity").NewBook[]>;
    addnewBook(files: {
        CoverImage: Express.Multer.File;
        file: Express.Multer.File;
    }, data: createDTO): Promise<import("./book.entity").NewBook>;
    getBookPdf(Id: number): Promise<StreamableFile>;
    getBookById(Id: number): Promise<import("./book.entity").NewBook>;
    getBookByName(bookName: string, data: any): Promise<import("./book.entity").NewBook[]>;
    getBookStatus(bookStatus: string, data: any): Promise<import("./book.entity").NewBook[]>;
    deleteBookById(bookId: number): void;
}
