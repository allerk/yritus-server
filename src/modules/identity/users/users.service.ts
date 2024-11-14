import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): User {
    return this.usersRepository.create(createUserDto);
  }

  async addRoleToUser(user: User, role: Role): Promise<User> {
    const userWithRolesAdded: User = {
      ...user,
      roles: [...user.roles!, role],
    };
    return this.usersRepository.save(userWithRolesAdded);
  }

  async findOneId(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email: email },
      relations: ['refreshTokens'],
    });
  }
}
