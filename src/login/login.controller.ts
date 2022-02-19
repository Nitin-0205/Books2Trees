import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService:LoginService
        ){}
    
        @Post("username")
        async password(@Res() res, @Body() body){
           console.log(body)
            const data =await this.loginService.password(body) 
            res.status(HttpStatus.OK).json(data)
        }

        @Post("SubmitOtp")
        async submitOtp(@Res() res, @Body() body){
                const data= await this.loginService.submitOtp(body)
                res.status(HttpStatus.OK).json(data)
        }
}
