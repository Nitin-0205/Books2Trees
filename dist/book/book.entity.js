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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewBook = void 0;
const typeorm_1 = require("typeorm");
let NewBook = class NewBook {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NewBook.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewBook.prototype, "User_Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewBook.prototype, "Book_title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewBook.prototype, "Edition", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewBook.prototype, "Author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewBook.prototype, "Publication", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewBook.prototype, "BookForYear", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewBook.prototype, "Branch", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'null' }),
    __metadata("design:type", String)
], NewBook.prototype, "CoverImage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewBook.prototype, "FileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'PENDING' }),
    __metadata("design:type", String)
], NewBook.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false,
        default: () => 'CURRENT_TIMESTAMP', }),
    __metadata("design:type", Date)
], NewBook.prototype, "Upload_Date", void 0);
NewBook = __decorate([
    (0, typeorm_1.Entity)()
], NewBook);
exports.NewBook = NewBook;
//# sourceMappingURL=book.entity.js.map