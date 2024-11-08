import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [RolesService],
})
export class RolesModule {}
