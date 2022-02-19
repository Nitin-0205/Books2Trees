"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassWordModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/users.entity");
const change_pass_word_controller_1 = require("./change-pass-word.controller");
const change_pass_word_service_1 = require("./change-pass-word.service");
let ChangePassWordModule = class ChangePassWordModule {
};
ChangePassWordModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_entity_1.User])],
        controllers: [change_pass_word_controller_1.ChangePassWordController],
        providers: [change_pass_word_service_1.ChangePassWordService]
    })
], ChangePassWordModule);
exports.ChangePassWordModule = ChangePassWordModule;
//# sourceMappingURL=change-pass-word.module.js.map