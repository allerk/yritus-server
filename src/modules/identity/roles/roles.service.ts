import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { UsersService } from '../users/users.service';
import ServiceError from '../../../errors/ServiceError';

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

    const role = await this.findOneBy({
      name: providedRole?.name,
    });

    const hasRole = user.roles!.some((userRole) => userRole.id === role.id);

    if (hasRole) {
      throw ServiceError.UserAlreadyHasThisRole(user.email, role.name);
    }

    return await this.usersService.addRoleToUser(user, role);
  }

  async findOneBy(conditions: object): Promise<Role> {
    const role = await this.rolesRepository.findOneBy(conditions);
    if (!role) {
      throw new NotFoundException(
        `Role not found by this conditions ${conditions}`,
      );
    }
    return role;
  }
}
