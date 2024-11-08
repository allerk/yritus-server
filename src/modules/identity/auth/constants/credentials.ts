import * as path from 'node:path';
import { config } from 'dotenv';
import * as process from 'node:process';

config({ path: path.resolve(__dirname + '../../../../env/.env.creds') });

export const jwtConstants = {
  secret: process.env.JWT_TOKEN,
};
