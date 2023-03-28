import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ContextIdFactory } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/users/services/users/users.service";

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private userService: UsersService){}
    async getUserBody(id : number) : Promise<any>{
        const user = await this.userService.findUserById(id);
        if (user){
            const userArray = user.roles;
            return userArray;
        }

    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const userArray = this.getUserBody(user.id).then();
        if(user ) return true;
        throw new UnauthorizedException("User is not an Admin");
    }
    

}