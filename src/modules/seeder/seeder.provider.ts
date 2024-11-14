import { Injectable } from '@nestjs/common';
import { RolesService } from '../identity/roles/roles.service';
import { ERole } from '../identity/auth/enums/role.enum';
import { CreateRoleDto } from '../identity/roles/dto/create-role.dto';
import { UsersService } from '../identity/users/users.service';
import { CreateUserDto } from '../identity/users/dto/create-user.dto';

@Injectable()
export class Seeder {
  constructor(
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  async seedIdentity() {
    const user: CreateUserDto = {
      username: 'Admin',
      password: 'FooBar1!',
      email: 'admin2@yritus.ee',
      phone: '+37255969946',
    };

    try {
      const createdUser = this.usersService.create(user);
      console.log(`User with ${user.email} email was created successfully!`);
      console.log(createdUser);

      const rolesDtos: CreateRoleDto[] = [{ name: ERole.Admin }];
      for (const roleDto of rolesDtos) {
        await this.rolesService.assignRole(createdUser.id, roleDto);
      }
      console.log('Successfully completed seeding identity...');
    } catch (error) {
      console.error('Error during user creation or role assignment:', error);
      throw error;
    }
  }

  async seedData() {
    // TODO: Implement seeding initial data
  }
}
