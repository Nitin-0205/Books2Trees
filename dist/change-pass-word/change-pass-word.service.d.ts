import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { changepass } from './changpass.dto';
export declare class ChangePassWordService {
    private User;
    constructor(User: Repository<User>);
    ChangePass(changepass: changepass): Promise<"Incorrect Current Password !!!" | import("typeorm").UpdateResult>;
}
