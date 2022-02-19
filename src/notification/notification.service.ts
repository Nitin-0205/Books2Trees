import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Notification } from './notification.entity';
@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification) private NotifyRepo : Repository<Notification>){}

    async getAllNotify(User_Id){
        const result =  await this.NotifyRepo.find({User_Id:User_Id});
        result.map((vals)=>{
            vals["Notyf_Date"] = vals.date.getDay()-1 +"/"+vals.date.getMonth()+"/"+vals.date.getFullYear()
            if(vals.date.getHours() > 12){
                vals["Notyf_Time"] = vals.date.getHours() - 12 +":"+vals.date.getMinutes()
                vals["Notyf_Period"] = "PM"
            }else{
                vals["Notyf_Time"] = vals.date.getHours() +":"+vals.date.getMinutes()
                vals["Notyf_Period"] = "PM"
            }
        })
        return result;
    }
    async UpdateStat(Id,view_status){
        if(view_status === "UNSEEN"){
            await getRepository(Notification)
            .createQueryBuilder()
            .update()
            .set({view_status:'UNSEEN'})
            .where({ Id: Id })
            .execute()
        }else{
            await getRepository(Notification)
            .createQueryBuilder()
            .update()
            .set({view_status:'SEEN'})
            .where({ Id: Id })
            .execute()
        }
    }

    async delNotify(notify_Id){
        await this.NotifyRepo.delete({Id:notify_Id});
    }
}
