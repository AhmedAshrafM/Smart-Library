import {IsEmail, IsString} from 'class-validator';
export class createUserDto {
    @IsString()
    fullName: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    flag: string;
    phone: string;
    roleIds: number[];

}