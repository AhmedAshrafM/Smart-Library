import {IsEmail, IsString} from 'class-validator';
export class createUserDto {
    fullName: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    flag: string;
    phone: string;
    roleIds: number[];

}