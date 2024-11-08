import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole } from './enums/role.enum';
import { RolesService } from '../roles/roles.service';
import ServiceError from '../../../errors/ServiceError';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginData: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(loginData.email);
    if (user?.password !== loginData.password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerData: RegisterDto): Promise<User> {
    const { username, email, phone, password } = registerData;

    const isUserExist = await this.usersService.findOneByEmail(email);

    if (!isUserExist) {
      const user = new User();
      user.username = username;
      user.email = email;
      user.phone = phone;
      user.password = password;
      const role = await this.rolesService.findOneByName(ERole.User);

      user.roles = [role!];

      return await this.userRepository.save(user);
    } else {
      throw ServiceError.UserAlreadyExists(email);
    }
  }
}
