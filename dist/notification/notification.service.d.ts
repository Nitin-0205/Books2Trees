import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
export declare class NotificationService {
    private NotifyRepo;
    constructor(NotifyRepo: Repository<Notification>);
    getAllNotify(User_Id: any): Promise<Notification[]>;
    UpdateStat(Id: any, view_status: any): Promise<void>;
    delNotify(notify_Id: any): Promise<void>;
}
