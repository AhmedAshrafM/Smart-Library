import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Roles';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
