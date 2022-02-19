import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGaurd } from './local-auth.guard';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
    authService: AuthService;
    
    @UseGuards(LocalAuthGaurd)
    @Post('login')
    login(@Body() req): any{
      return this.authService.login(req.user); // return JWT access token
    }
  
    
  
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(@Body() req): string {   // require a bearer token
      return req.user;
    }
}
