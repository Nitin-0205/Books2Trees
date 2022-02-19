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
exports.ChangePassWordController = void 0;
const common_1 = require("@nestjs/common");
const changpass_dto_1 = require("./changpass.dto");
const change_pass_word_service_1 = require("./change-pass-word.service");
let ChangePassWordController = class ChangePassWordController {
    constructor(ChangPassWordServ) {
        this.ChangPassWordServ = ChangPassWordServ;
    }
    async ChangePass(data) {
        return this.ChangPassWordServ.ChangePass(data);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changpass_dto_1.changepass]),
    __metadata("design:returntype", Promise)
], ChangePassWordController.prototype, "ChangePass", null);
ChangePassWordController = __decorate([
    (0, common_1.Controller)('changePasword'),
    __metadata("design:paramtypes", [change_pass_word_service_1.ChangePassWordService])
], ChangePassWordController);
exports.ChangePassWordController = ChangePassWordController;
//# sourceMappingURL=change-pass-word.controller.js.map