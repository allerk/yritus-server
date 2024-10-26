import { config } from 'dotenv';
import * as path from 'node:path';
import * as process from 'node:process';

config({ path: path.resolve(__dirname + '../../../../env/.env') });

export default () => ({
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PORT: process.env.DATABASE_PORT,
  entities: [path.resolve(__dirname + '/../../**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname + '/../../migrations/*')],
});
