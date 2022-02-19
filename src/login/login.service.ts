import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { AuthVerifyTransaction } from './../Database/Entities/authVerifyTransaction.entity';
import { v4 as uuid } from 'uuid';

import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class LoginService {

    constructor(
    @InjectRepository(User) private userRepo:Repository<User>,
    @InjectRepository(AuthVerifyTransaction) private authVerifyTransactionRepo:Repository<AuthVerifyTransaction>,
    private mailerService:MailService,

    ){}


    async password(data){
        const user=await this.userRepo.findOne({where:{username:data.username}})
        
        if(!user){
            throw new HttpException(
                "No user found for Username",
                HttpStatus.NOT_FOUND,
            );
        }
        
        let authVerifyTransaction=null;
        if(user.password==data.password){
            var digits = '0123456789';
            let OTP = '';
			for (let i = 0; i < 6; i++ ) {
				OTP += digits[Math.floor(Math.random() * 10)];
			}
			

			authVerifyTransaction = new AuthVerifyTransaction();
            authVerifyTransaction.userId = user.userId;
            authVerifyTransaction.challenge = OTP;
            authVerifyTransaction.challengeId = uuid();
            authVerifyTransaction.challengeType = 1;
            authVerifyTransaction.verificationState = 0;
            const data=await this.authVerifyTransactionRepo.save(authVerifyTransaction)

            this.mailerService.sendUserOtp(user,authVerifyTransaction)
            let resObj = {
				challengeSent: "Yes",
				
				challengeId: authVerifyTransaction.challengeId,
				challengeExp: new Date(),
				userId: user.userId,
			};
            return resObj
    }
    else{
        return "wrong Password"
    }
    
    }

    async submitOtp(submitOtpDTO){
        const user= this.userRepo.findOne({where:{userId:submitOtpDTO.userId}})
        if(!user){
            throw new HttpException(
                "No user found for Username",
                HttpStatus.NOT_FOUND,
            );
        }
        const authVerifyTransaction = await this.authVerifyTransactionRepo.findOne(
			{
				where: {
					challengeId: submitOtpDTO.challengeId,
				
					
					userId: submitOtpDTO.userId,
				},
			},
		);
        if (!authVerifyTransaction) {
		
			throw new HttpException(
				"authVerifyTransaction not found",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
        let updateUserState = -1;
		if (authVerifyTransaction.verificationState.valueOf() === 2) {
			// Invalid or Expired
			// updateUserState = 2;
			
			throw new HttpException(
				"Invalid Or Expired",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		} else if (authVerifyTransaction.verificationState.valueOf() === 1) {
			// Already verified
			// User is already verified
			return {verification:"Already Verified"}

		}
        else{
						if (
							new Date().getTime() -
							authVerifyTransaction.createTime.getTime() >
							parseInt(process.env.OTP_VALIDITY)
						) {
							// Link expired
							
			
							// updateUserState = 2;
							authVerifyTransaction.verificationState = 2;
						
							
								return {verification:"Expired"}
							
						}
						else {
							if(authVerifyTransaction.challenge!=submitOtpDTO.challenge){
							return {verification:"Otp does not match"}
							}
							updateUserState = 1;
							authVerifyTransaction.verificationState = 1;
						
							
						}


						const newTransaction = await this.authVerifyTransactionRepo.save(
							// authVerifyTransaction.userId,
							authVerifyTransaction,
						);
						return {verification:"Verified"}					
		}
    }

}
