import { NestFactory } from '@nestjs/core';
import { SeederModule } from '../modules/seeder/seeder.module';
import { Seeder } from '../modules/seeder/seeder.provider';
import initializeConfig from '../config/app/app.config';

export class AppDataHelper {
  public static async SetupData() {
    try {
      const appContext =
        await NestFactory.createApplicationContext(SeederModule);
      const seeder = appContext.get(Seeder);
      const { seedIdentity, seedData } = initializeConfig().dataInitialization;
      try {
        if (seedIdentity) {
          await seeder.seedIdentity();
          console.debug('Identity seeding completed!');
        }

        if (seedData) {
          await seeder.seedData();
          console.debug('Data seeding completed!');
        }
      } catch (error) {
        console.error('Seeding failed!', error);
      } finally {
        await appContext.close();
      }
    } catch (error) {
      console.error('Failed to initialize app context:', error);
    }
  }
}
