import { IsNotEmpty } from "class-validator";

export class changepass{

    @IsNotEmpty()
    UserName:string

    @IsNotEmpty()
    CurrentPassWord:string

    @IsNotEmpty()
    NewPassWord:string

}