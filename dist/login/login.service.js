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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/users.entity");
const typeorm_2 = require("typeorm");
const authVerifyTransaction_entity_1 = require("./../Database/Entities/authVerifyTransaction.entity");
const uuid_1 = require("uuid");
const mail_service_1 = require("../mail/mail.service");
let LoginService = class LoginService {
    constructor(userRepo, authVerifyTransactionRepo, mailerService) {
        this.userRepo = userRepo;
        this.authVerifyTransactionRepo = authVerifyTransactionRepo;
        this.mailerService = mailerService;
    }
    async password(data) {
        const user = await this.userRepo.findOne({ where: { username: data.username } });
        if (!user) {
            throw new common_1.HttpException("No user found for Username", common_1.HttpStatus.NOT_FOUND);
        }
        let authVerifyTransaction = null;
        if (user.password == data.password) {
            var digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 6; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            authVerifyTransaction = new authVerifyTransaction_entity_1.AuthVerifyTransaction();
            authVerifyTransaction.userId = user.userId;
            authVerifyTransaction.challenge = OTP;
            authVerifyTransaction.challengeId = (0, uuid_1.v4)();
            authVerifyTransaction.challengeType = 1;
            authVerifyTransaction.verificationState = 0;
            const data = await this.authVerifyTransactionRepo.save(authVerifyTransaction);
            this.mailerService.sendUserOtp(user, authVerifyTransaction);
            let resObj = {
                challengeSent: "Yes",
                challengeId: authVerifyTransaction.challengeId,
                challengeExp: new Date(),
                userId: user.userId,
            };
            return resObj;
        }
        else {
            return "wrong Password";
        }
    }
    async submitOtp(submitOtpDTO) {
        const user = this.userRepo.findOne({ where: { userId: submitOtpDTO.userId } });
        if (!user) {
            throw new common_1.HttpException("No user found for Username", common_1.HttpStatus.NOT_FOUND);
        }
        const authVerifyTransaction = await this.authVerifyTransactionRepo.findOne({
            where: {
                challengeId: submitOtpDTO.challengeId,
                userId: submitOtpDTO.userId,
            },
        });
        if (!authVerifyTransaction) {
            throw new common_1.HttpException("authVerifyTransaction not found", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        let updateUserState = -1;
        if (authVerifyTransaction.verificationState.valueOf() === 2) {
            throw new common_1.HttpException("Invalid Or Expired", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else if (authVerifyTransaction.verificationState.valueOf() === 1) {
            return { verification: "Already Verified" };
        }
        else {
            if (new Date().getTime() -
                authVerifyTransaction.createTime.getTime() >
                parseInt(process.env.OTP_VALIDITY)) {
                authVerifyTransaction.verificationState = 2;
                return { verification: "Expired" };
            }
            else {
                if (authVerifyTransaction.challenge != submitOtpDTO.challenge) {
                    return { verification: "Otp does not match" };
                }
                updateUserState = 1;
                authVerifyTransaction.verificationState = 1;
            }
            const newTransaction = await this.authVerifyTransactionRepo.save(authVerifyTransaction);
            return { verification: "Verified" };
        }
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(authVerifyTransaction_entity_1.AuthVerifyTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map