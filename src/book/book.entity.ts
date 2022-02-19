import { Entity, PrimaryGeneratedColumn,Column, Timestamp} from "typeorm";

@Entity()
export class NewBook{
    @PrimaryGeneratedColumn()
    Id : number;
    
    @Column()
    User_Id:string

    @Column()
    Book_title:string

    @Column()
    Edition: string;

    @Column()
    Author: string;

    @Column()
    Publication: string;

    @Column()
    BookForYear: string;

    @Column()
    Branch: string;

    @Column({default :'null'})
    CoverImage: string;

    @Column()
    FileName: string;

    @Column({default :'PENDING'})
    Status: string;
    
    @Column({nullable: false,
        default: () => 'CURRENT_TIMESTAMP',})
    Upload_Date: Date;
}