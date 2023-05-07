import { IsEmail, IsString } from "class-validator";
import Role from "src/roles/role.enum";

export class updateUserDto {
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