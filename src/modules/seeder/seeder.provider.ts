import { Injectable } from '@nestjs/common';
import { AuthService } from '../identity/auth/auth.service';
import { RegisterDto } from '../identity/auth/dto/register.dto';
import { RolesService } from '../identity/roles/roles.service';
import { ERole } from '../identity/auth/enums/role.enum';
import { CreateRoleDto } from '../identity/roles/dto/create-role.dto';

@Injectable()
export class Seeder {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RolesService,
  ) {}

  async seedIdentity() {
    const user: RegisterDto = {
      username: 'Admin',
      password: 'FooBar1!',
      email: 'admin@yritus.ee',
      phone: '+37255969946',
    };

    try {
      const createdUser = await this.authService.register(user);
      console.log(`User with ${user.email} email was created successfully!`);
      console.log(createdUser);

      const role = await this.roleService.findOneByName(ERole.Admin);
      await this.roleService.assignRole(createdUser.id, {
        name: role.name,
      } as CreateRoleDto);
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
