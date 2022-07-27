import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableLaundryAddCep1658880221451 implements MigrationInterface {
    name = 'alterTableLaundryAddCep1658880221451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laundry" ADD "cep" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laundry" DROP COLUMN "cep"`);
    }

}
