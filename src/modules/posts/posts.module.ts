import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../identity/auth/guards/auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class PostsModule {}
