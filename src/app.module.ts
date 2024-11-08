import { Module } from '@nestjs/common';
import { UsersModule } from './modules/identity/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/identity/auth/auth.module';
import { RolesModule } from './modules/identity/roles/roles.module';
import { TagsModule } from './modules/tags/tags.module';
import { DatabaseProviderModule } from './modules/db/database.module';
import { RefreshTokensModule } from './modules/identity/refresh-tokens/refresh-tokens.module';

@Module({
  imports: [
    DatabaseProviderModule,
    UsersModule,
    PostsModule,
    AuthModule,
    RolesModule,
    TagsModule,
    RefreshTokensModule,
  ],
})
export class AppModule {}
