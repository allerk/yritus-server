import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokensController } from './refresh-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  controllers: [RefreshTokensController],
  providers: [RefreshTokensService],
  imports: [TypeOrmModule.forFeature([RefreshToken])],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
