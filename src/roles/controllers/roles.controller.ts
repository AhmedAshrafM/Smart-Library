import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { createRoleDto } from 'src/roles/dtos/createRole.dto';
import { updateRoleDto } from 'src/roles/dtos/updateRole.dto';
import { RolesService } from 'src/roles/services/roles.service';
import { Roles } from '../role.decorator';
import Role from '../role.enum';

@Controller('roles')
export class RolesController {
constructor(private roleService: RolesService){}
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.Admin || Role.SuperAdmin)
    @Get()
    getRoles(){
        return this.roleService.fetchRoles();
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin,Role.SuperAdmin)
    @Post()
    createRole(@Body() createRoleDto: createRoleDto){
        this.roleService.createRole(createRoleDto);
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin,Role.SuperAdmin)
    @Put(':id')
   async updateRoleById(
    @Param('id', ParseIntPipe) role_id: number,
    @Body() updateRoleDto: updateRoleDto,
   ){
    await this.roleService.updateRole(role_id,updateRoleDto);
   }
   @UseGuards(JwtAuthGuard,RolesGuard)
   @Roles(Role.Admin,Role.SuperAdmin)
   @Delete(':id')
  async deleteRoleById(
    @Param('id', ParseIntPipe) role_id: number) {
   await this.roleService.deleteRole(role_id);
  }
}
