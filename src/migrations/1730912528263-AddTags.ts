import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTags1730912528263 implements MigrationInterface {
  name = 'AddTags1730912528263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`label\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`post_tags\` (\`post_id\` varchar(36) NOT NULL, \`tag_id\` varchar(36) NOT NULL, INDEX \`IDX_5df4e8dc2cb3e668b962362265\` (\`post_id\`), INDEX \`IDX_192ab488d1c284ac9abe2e3035\` (\`tag_id\`), PRIMARY KEY (\`post_id\`, \`tag_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_tags\` ADD CONSTRAINT \`FK_5df4e8dc2cb3e668b962362265d\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_tags\` ADD CONSTRAINT \`FK_192ab488d1c284ac9abe2e30356\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`post_tags\` DROP FOREIGN KEY \`FK_192ab488d1c284ac9abe2e30356\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_tags\` DROP FOREIGN KEY \`FK_5df4e8dc2cb3e668b962362265d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_192ab488d1c284ac9abe2e3035\` ON \`post_tags\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5df4e8dc2cb3e668b962362265\` ON \`post_tags\``,
    );
    await queryRunner.query(`DROP TABLE \`post_tags\``);
    await queryRunner.query(`DROP TABLE \`tag\``);
  }
}
