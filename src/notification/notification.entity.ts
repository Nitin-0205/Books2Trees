import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification{
    @PrimaryGeneratedColumn()
    Id : number;

    @Column()
    User_Id:string;

    @Column()
    title:string;

    @Column()
    text:string;

    @Column({default:'UNSEEN'})
    view_status:string;

    @Column({nullable: false,
        default: () => 'CURRENT_TIMESTAMP',})
    date: Date;
}