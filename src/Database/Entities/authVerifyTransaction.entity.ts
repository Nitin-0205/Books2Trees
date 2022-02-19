import {
	Entity,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()

 export class AuthVerifyTransaction {
        
        @PrimaryColumn()
        userId: string;
    
        @Column()
        challengeType: number;
    
        @PrimaryColumn()
        challengeId: string;
    
        @Column()
        challenge: string;
    
        @Column()
        verificationState: number;
    
        @CreateDateColumn()
        createTime: Date;
    
        @UpdateDateColumn()
        updateTime: Date;
    
        
    }
    

