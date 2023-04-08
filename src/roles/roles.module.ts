import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from 'src/typeorm/entities/Audit';
import { Role } from 'src/typeorm/entities/Roles';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role,Audit])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
