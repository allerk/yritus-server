import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ERole } from '../auth/enums/role.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(ERole.Admin)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Roles(ERole.Admin)
  @Put(':id')
  assignRoleToUser(@Param('id') id: string, @Body() role: CreateRoleDto) {
    return this.rolesService.assignRole(id, role);
  }
}
