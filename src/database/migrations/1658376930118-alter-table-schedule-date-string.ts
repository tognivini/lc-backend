import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableScheduleDateString1658376930118 implements MigrationInterface {
    name = 'alterTableScheduleDateString1658376930118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
