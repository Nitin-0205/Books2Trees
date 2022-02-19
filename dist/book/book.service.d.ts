import { Repository } from 'typeorm';
import { NewBook } from './book.entity';
import { createDTO } from './create.dto';
export declare class BookService {
    private repo;
    constructor(repo: Repository<NewBook>);
    getAllBooks(userId: any): Promise<NewBook[]>;
    createBook(createbookDto: createDTO): Promise<NewBook>;
    updateBookStatus(): Promise<void>;
    getBookByName(userId: any, bookName: any): Promise<NewBook[]>;
    getBookbyId(Id: any): Promise<NewBook>;
    getBookStatus(userId: any, Status: any): Promise<NewBook[]>;
    deleteBookById(BookId: any): Promise<void>;
    getBookPdf(BookId: any): Promise<string>;
}
