import { Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGaurd } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(LocalAuthGaurd)
  @Post('login')
  login(@Request() req): any{
    return this.authService.login(req.user); // return JWT access token
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {   // require a bearer token
    return req.user;
  }

}
