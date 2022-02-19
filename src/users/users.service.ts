/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

// export type User = {
//     id: number;
//     name: string;
//     username: string;
//     password: string;
// };

// private readonly users: User[] = [
//         {
//             id: 1,
//             name: 'Neha',
//             username: 'neha@gmail.com',
//             password: 'secure'
//         },
//         {
//             id: 2,
//             name: 'Rahul',
//             username: 'rahul@gmail.com',
//             password: 'rahulsecure'
//         }
//     ];

//     async findOne(username: string): Promise<User | undefined>{
//         return this.users.find(user => user.username === username);
//     }
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}
    
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // // findOne(id: string): Promise<NewUser> {
    // //     return this.userRepository.findOne(id);
    // // }

   

    async findOne(username: string): Promise<User | undefined>{
        console.log("wooorkkk");
        
        return this.userRepository.findOne(username);
    }
    
}
