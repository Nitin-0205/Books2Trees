import { NotificationService } from './notification.service';
export declare class NotificationController {
    private NotifyService;
    constructor(NotifyService: NotificationService);
    getNotify(UserId: string): Promise<import("./notification.entity").Notification[]>;
    UpdateStat(Id: string, data: any): Promise<void>;
    delNotify(notify_Id: string): Promise<void>;
}
