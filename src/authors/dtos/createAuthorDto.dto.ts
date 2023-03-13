import { IsString, Min } from "class-validator";

export class createAuthorDto {
    @IsString()
    authorName:string;
}