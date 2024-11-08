import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../config/db/db.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: configService.get('entities'),
        migrations: configService.get('migrations'),
        synchronize: false,
      }),
      dataSourceFactory: async (options) => {
        try {
          // console.log('Database connected successfully');
          return await new DataSource(options!).initialize();
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
})
export class DatabaseProviderModule {}
