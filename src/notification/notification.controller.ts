import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {NotificationService} from './notification.service'

@Controller('notification')
export class NotificationController {
    constructor (private NotifyService:NotificationService){}

    @Get('/:User_Id')
    getNotify(@Param('User_Id') UserId:string){
        return this.NotifyService.getAllNotify(UserId);
    }
    @Post('/:Id')
    UpdateStat(@Param('Id') Id:string ,
    @Body()data ){
        return this.NotifyService.UpdateStat(Id,data.state);
    }
    @Delete('/:notify_Id')
    delNotify(@Param('notify_Id') notify_Id:string){
        return this.NotifyService.delNotify(notify_Id);
    }

}
