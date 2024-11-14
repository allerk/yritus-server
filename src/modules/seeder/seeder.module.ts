import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from '../db/database.module';
import { Seeder } from './seeder.provider';
import { AuthModule } from '../identity/auth/auth.module';
import { RolesModule } from '../identity/roles/roles.module';
import { UsersModule } from '../identity/users/users.module';

@Module({
  imports: [DatabaseProviderModule, AuthModule, RolesModule, UsersModule],
  providers: [Seeder],
})
export class SeederModule {}
