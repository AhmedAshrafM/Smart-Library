import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import * as Bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}
    async validateUser(email: string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(email);
        const valid = await Bcrypt.compare(pass,user.password);
        
        if(!user || !valid){
            throw new UnauthorizedException("Wrong username or password");
        }
        
        return user
    }
    async login(user: any) {        
        const payload = { username: user.email, sub: user.id , roles: user.roles };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
