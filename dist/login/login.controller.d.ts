import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    password(res: any, body: any): Promise<void>;
    submitOtp(res: any, body: any): Promise<void>;
}
