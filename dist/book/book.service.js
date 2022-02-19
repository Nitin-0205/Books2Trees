"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./book.entity");
let BookService = class BookService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAllBooks(userId) {
        return this.repo.find({ User_Id: userId });
    }
    async createBook(createbookDto) {
        const book = new book_entity_1.NewBook();
        const { User_Id, Book_title, Edition, Author, Publication, BookForYear, Branch, CoverImage, FileName } = createbookDto;
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
        return resul;
    }
    async updateBookStatus() {
        const result = await (0, typeorm_2.getRepository)(book_entity_1.NewBook)
            .createQueryBuilder()
            .update()
            .set({ Status: "PUBLISHED" })
            .where("Upload_Date <= (NOW() - INTERVAL 1 DAY) && Status = 'PENDING'")
            .execute();
    }
    getBookByName(userId, bookName) {
        try {
            return this.repo.find({ User_Id: userId, Book_title: bookName });
        }
        catch (err) {
            throw err;
        }
    }
    async getBookbyId(Id) {
        try {
            const val = await this.repo.findOneOrFail({ Id: Id });
            if (val.Status === "PENDING") {
                const now = new Date().getTime();
                val.Upload_Date.setDate(val.Upload_Date.getDate() + 1);
                const timeleft = val.Upload_Date.getTime() - now;
                var hours = Math.floor((timeleft) / (1000 * 60 * 60));
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
                const diffTime = hours + ":" + minutes + ":" + seconds;
                val['TimeLeft'] = diffTime;
            }
            else {
                val['TimeLeft'] = '';
            }
            val["uploadDate"] = (val.Upload_Date.getMonth() + 1) + '/' + val.Upload_Date.getDate() + '/' + val.Upload_Date.getFullYear();
            return val;
        }
        catch (err) {
        }
    }
    async getBookStatus(userId, Status) {
        return this.repo.find({ User_Id: userId, Status: Status });
    }
    async deleteBookById(BookId) {
        let found = await this.repo.findOne({ Id: BookId });
        if (found) {
            let deleted = await this.repo.delete({ Id: BookId });
            const fs = require('fs');
            const path = './uploads/BookFiles/' + found.FileName;
            try {
                fs.unlinkSync(path);
            }
            catch (err) {
                throw err;
            }
        }
        else {
            throw new common_1.HttpException("Failed To Delete", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getBookPdf(BookId) {
        try {
            const bookDetail = await this.repo.findOneOrFail({ Id: BookId });
            return await bookDetail.FileName;
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('* * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookService.prototype, "updateBookStatus", null);
BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.NewBook)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map