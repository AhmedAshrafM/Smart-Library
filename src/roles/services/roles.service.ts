import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Roles';
import { CreateRoleParams, UpdateRoleParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
    ){}
    fetchRoles(){
        return this.rolesRepository.find()
    }

    createRole(roleDetails: CreateRoleParams){
        const newRole = this.rolesRepository.create({...roleDetails});
        return this.rolesRepository.save(newRole);
    }

    updateRole(role_id: number, updateRoleDetails: UpdateRoleParams){
        return this.rolesRepository.update( role_id , { ...updateRoleDetails });
    }

    deleteRole(role_id: number){
        return this.rolesRepository.delete(role_id);
    }
}
