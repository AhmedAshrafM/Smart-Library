import { Injectable, CanActivate, ExecutionContext, Dependencies } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/roles/role.decorator';
import Roles, { Role } from 'src/roles/role.enum';
import { User } from 'src/typeorm/entities/User';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user as User;
          
        const hasRole = (role) => !!roles.find((item) => item === role);

        if (user && hasRole(user.roles)) {

            return true;
        }
        
    }
}




