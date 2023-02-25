import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1677265498924 implements MigrationInterface {
  name = 'auto1677265498924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "barcode_entity" ("id" varchar PRIMARY KEY NOT NULL, "content" text NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "barcode_entity"`);
  }
}
