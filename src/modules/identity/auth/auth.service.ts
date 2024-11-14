import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ERole } from './enums/role.enum';
import { RolesService } from '../roles/roles.service';
import ServiceError from '../../../errors/ServiceError';
import appConfig from '../../../config/app/app.config';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { RefreshToken } from '../refresh-tokens/entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtResponse } from './dto/jwt-response';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto): Promise<JwtResponse> {
    const user = await this.usersService.findOneByEmail(loginData.email);
    if (user?.password !== loginData.password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const { tokenExpiresIn } = appConfig().jwt;

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: tokenExpiresIn || '1m',
    });

    const userRefreshTokensList = user.refreshTokens;

    if (userRefreshTokensList.length > 0) {
      for (const refreshToken of userRefreshTokensList) {
        if (refreshToken.tokenExpirationDateTime.getTime() < Date.now()) {
          await this.refreshTokensService.remove(refreshToken.id);
        }
      }
    }

    const refreshToken = new RefreshToken();

    refreshToken.userId = user.id;
    refreshToken.token = uuidv4().toString();

    await this.refreshTokensService.create(refreshToken);

    return new JwtResponse(
      access_token,
      refreshToken.token,
      user.username,
      user.email,
      user.id,
    );
  }

  async register(registerData: RegisterDto): Promise<JwtResponse> {
    const { username, email, phone, password } = registerData;

    const isUserExist = await this.usersService.findOneByEmail(email);

    if (!isUserExist) {
      const userDto = new CreateUserDto();
      userDto.username = username;
      userDto.email = email;
      userDto.phone = phone;
      userDto.password = password;

      const createdUser = this.usersService.create(userDto);
      const user = await this.rolesService.assignRole(createdUser.id, {
        name: ERole.User,
      });

      const payload = {
        sub: user.id,
        email: user.email,
        roles: user.roles,
      };

      const { tokenExpiresIn } = appConfig().jwt;

      const access_token = await this.jwtService.signAsync(payload, {
        expiresIn: tokenExpiresIn || '1m',
      });

      const refreshToken = new RefreshToken();

      refreshToken.userId = user.id;
      refreshToken.token = uuidv4().toString();

      await this.refreshTokensService.create(refreshToken);

      return new JwtResponse(
        access_token,
        refreshToken.token,
        user.username,
        user.email,
        user.id,
      );
    } else {
      throw ServiceError.UserAlreadyExists(email);
    }
  }
}
