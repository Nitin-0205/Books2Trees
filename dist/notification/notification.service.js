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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./notification.entity");
let NotificationService = class NotificationService {
    constructor(NotifyRepo) {
        this.NotifyRepo = NotifyRepo;
    }
    async getAllNotify(User_Id) {
        const result = await this.NotifyRepo.find({ User_Id: User_Id });
        result.map((vals) => {
            vals["Notyf_Date"] = vals.date.getDay() - 1 + "/" + vals.date.getMonth() + "/" + vals.date.getFullYear();
            if (vals.date.getHours() > 12) {
                vals["Notyf_Time"] = vals.date.getHours() - 12 + ":" + vals.date.getMinutes();
                vals["Notyf_Period"] = "PM";
            }
            else {
                vals["Notyf_Time"] = vals.date.getHours() + ":" + vals.date.getMinutes();
                vals["Notyf_Period"] = "PM";
            }
        });
        return result;
    }
    async UpdateStat(Id, view_status) {
        if (view_status === "UNSEEN") {
            await (0, typeorm_2.getRepository)(notification_entity_1.Notification)
                .createQueryBuilder()
                .update()
                .set({ view_status: 'UNSEEN' })
                .where({ Id: Id })
                .execute();
        }
        else {
            await (0, typeorm_2.getRepository)(notification_entity_1.Notification)
                .createQueryBuilder()
                .update()
                .set({ view_status: 'SEEN' })
                .where({ Id: Id })
                .execute();
        }
    }
    async delNotify(notify_Id) {
        await this.NotifyRepo.delete({ Id: notify_Id });
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map