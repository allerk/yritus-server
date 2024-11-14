import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUsersEmailUnique1731534880813 implements MigrationInterface {
  name = 'MakeUsersEmailUnique1731534880813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``,
    );
  }
}
