import {IsEmail, IsString} from 'class-validator';
import Role from 'src/roles/role.enum';
export class createUserDto {
    @IsString()
    fullName: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    flag: string;
    phone: string;
   // roleIds: number[];
   roles: Role[]

}