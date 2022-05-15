import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1652643356057 implements MigrationInterface {
    name = 'firstMigration1652643356057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" smallint NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "name" integer NOT NULL, "type_person" character varying NOT NULL, "permission" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
