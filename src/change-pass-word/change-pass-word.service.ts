import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { changepass } from './changpass.dto';



@Injectable()
export class ChangePassWordService {
    constructor(@InjectRepository(User) private User : Repository<User>){}

    async ChangePass(changepass: changepass){
        const {UserName ,CurrentPassWord,NewPassWord} = changepass;
        const find = await this.User.findOne({username :UserName})
        if(CurrentPassWord !==  find.password){
            return "Incorrect Current Password !!!";
        }else{
            const updated  = await getRepository(User)
            .createQueryBuilder()
            .update()
            .set({ password:NewPassWord })
            .where({username :UserName})
            .execute()
            return updated; 
        }
    }
}
