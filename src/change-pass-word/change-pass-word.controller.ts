import { Body, Controller, Post } from '@nestjs/common';
import { changepass } from './changpass.dto';
import { ChangePassWordService } from './change-pass-word.service';

@Controller('changePasword')
export class ChangePassWordController {
    constructor(private ChangPassWordServ: ChangePassWordService) {
    }
    
    @Post()
    async ChangePass(@Body() data:changepass){
        return this.ChangPassWordServ.ChangePass(data);
    }
}
