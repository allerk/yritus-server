import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAndUpdatedAtToRole1730911778012
  implements MigrationInterface
{
  name = 'AddCreatedAndUpdatedAtToRole1730911778012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`createdAt\``);
  }
}
