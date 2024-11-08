import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RolesService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.rolesRepository.save(createRoleDto);
  }

  async assignRole(userId: string, providedRole: CreateRoleDto) {
    const user = await this.usersService.findOneId(userId);

    const role = await this.rolesRepository.findOneBy({
      name: providedRole?.name,
    });

    if (user && role) {
      const hasRole = user.roles!.some((userRole) => userRole.id === role.id);

      if (!hasRole) {
        user.roles!.push(role);
      } else {
        return `User ${user.email} already has ${role.name} role`;
      }

      return await this.usersService.create(user);
    }

    throw new Error('User or Role not found');
  }

  async findOneByName(name: string): Promise<Role> {
    const role = await this.rolesRepository.findOneBy({ name: name });
    if (role) return role;
    throw new Error('Role not found');
  }
}
