import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';

config({ path: path.resolve(__dirname + '../../../env/.env') });

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: +configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [path.resolve(__dirname + '/../**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname + '/../migrations/*')],
  synchronize: true,
});

export default AppDataSource;
