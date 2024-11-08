import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../identity/auth/guards/auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  controllers: [TagsController],
  providers: [
    TagsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
