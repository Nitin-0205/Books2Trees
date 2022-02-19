import { changepass } from './changpass.dto';
import { ChangePassWordService } from './change-pass-word.service';
export declare class ChangePassWordController {
    private ChangPassWordServ;
    constructor(ChangPassWordServ: ChangePassWordService);
    ChangePass(data: changepass): Promise<"Incorrect Current Password !!!" | import("typeorm").UpdateResult>;
}
