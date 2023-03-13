import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { createRoleDto } from 'src/roles/dtos/createRole.dto';
import { updateRoleDto } from 'src/roles/dtos/updateRole.dto';
import { RolesService } from 'src/roles/services/roles.service';

@Controller('roles')
export class RolesController {
constructor(private roleService: RolesService){}
    @Get()
    getRoles(){
        return this.roleService.fetchRoles();
    }

    @Post()
    createRole(@Body() createRoleDto: createRoleDto){
        this.roleService.createRole(createRoleDto);
    }

    @Put(':id')
   async updateRoleById(
    @Param('id', ParseIntPipe) role_id: number,
    @Body() updateRoleDto: updateRoleDto,
   ){
    await this.roleService.updateRole(role_id,updateRoleDto);
   }

   @Delete(':id')
  async deleteRoleById(
    @Param('id', ParseIntPipe) role_id: number) {
   await this.roleService.deleteRole(role_id);
  }
}
