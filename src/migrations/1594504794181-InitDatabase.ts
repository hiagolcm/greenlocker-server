import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InitDatabase1594504794181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(): Promise<void> {}
}
