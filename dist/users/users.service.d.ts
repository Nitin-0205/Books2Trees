import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(username: string): Promise<User | undefined>;
}
