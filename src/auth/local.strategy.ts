import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Dependencies } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,private moduleRef: ModuleRef) {
    super({
        usernameField: 'email',
        
    });
    this.authService = authService;
  }

  async validate(username, password) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      console.log("error 2");
      
   throw new UnauthorizedException();
    }
    return user;
  }
}