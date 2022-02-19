import { IsNotEmpty, MaxLength } from "class-validator";

export class createDTO{
    
    @IsNotEmpty()
    User_Id:string

    @IsNotEmpty()
    Book_title:string

    Edition: string;

    @IsNotEmpty()
    Author: string;
    
    @IsNotEmpty()
    Publication: string;

    @IsNotEmpty()
    BookForYear: string;

    @IsNotEmpty()
    Branch: string;

    CoverImage: string;

    @IsNotEmpty()
    FileName: string;

}

export class createFileDTO{
}
