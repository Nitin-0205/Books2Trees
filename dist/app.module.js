"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const book_module_1 = require("./book/book.module");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const login_module_1 = require("./login/login.module");
const mail_module_1 = require("./mail/mail.module");
const schedule_1 = require("@nestjs/schedule");
const notification_module_1 = require("./notification/notification.module");
const change_pass_word_module_1 = require("./change-pass-word/change-pass-word.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'books',
                autoLoadEntities: true,
                synchronize: true,
            }),
            book_module_1.BookModule, users_module_1.UsersModule, auth_module_1.AuthModule, config_1.ConfigModule.forRoot(), login_module_1.LoginModule, mail_module_1.MailModule, schedule_1.ScheduleModule.forRoot(), notification_module_1.NotificationModule, change_pass_word_module_1.ChangePassWordModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map