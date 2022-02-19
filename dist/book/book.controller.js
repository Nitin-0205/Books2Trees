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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const multer_1 = require("multer");
const book_service_1 = require("./book.service");
const create_dto_1 = require("./create.dto");
const PdfHelper_1 = require("./PdfHelper");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    getAllBooks(data) {
        return this.bookService.getAllBooks(data.userId);
    }
    async addnewBook(files, data) {
        data.FileName = files.file[0].filename;
        data.CoverImage = files.CoverImage[0].filename;
        console.log(data.FileName);
        console.log(data.CoverImage);
        return await this.bookService.createBook(data);
    }
    async getBookPdf(Id) {
        try {
            const pdfFileName = await this.bookService.getBookPdf(Id);
            const file = (0, fs_1.createReadStream)("./uploads/BookFiles/" + pdfFileName);
            return new common_1.StreamableFile(file);
        }
        catch (e) {
            throw new common_1.HttpException({ message: "Book Not Found" }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    getBookById(Id) {
        return this.bookService.getBookbyId(Id);
    }
    getBookByName(bookName, data) {
        return this.bookService.getBookByName(data.userId, bookName);
    }
    getBookStatus(bookStatus, data) {
        return this.bookService.getBookStatus(data.userId, bookStatus);
    }
    deleteBookById(bookId) {
        this.bookService.deleteBookById(bookId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Post)("/NewBook"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: "CoverImage",
            maxCount: 1,
        },
        {
            name: "file",
            maxCount: 1,
        }
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: PdfHelper_1.PdfHelper.destinationPath,
            filename: PdfHelper_1.PdfHelper.customFileName,
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dto_1.createDTO]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addnewBook", null);
__decorate([
    (0, common_1.Get)('/pdfFile/:bookId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Header)('Content-Type', 'application/pdf'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBookPdf", null);
__decorate([
    (0, common_1.Get)('/bookInfo/:bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getBookById", null);
__decorate([
    (0, common_1.Post)('/publish/search/:bookName'),
    __param(0, (0, common_1.Param)('bookName')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getBookByName", null);
__decorate([
    (0, common_1.Post)('/publish/:bookStatus'),
    __param(0, (0, common_1.Param)('bookStatus')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getBookStatus", null);
__decorate([
    (0, common_1.Delete)('/delete/:bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "deleteBookById", null);
BookController = __decorate([
    (0, common_1.Controller)('/book'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map