import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokensRepository: Repository<RefreshToken>,
  ) {}
  create(refreshToken: RefreshToken) {
    return this.refreshTokensRepository.save(refreshToken);
  }

  async remove(id: string) {
    return this.refreshTokensRepository.delete({ id: id });
  }
}
