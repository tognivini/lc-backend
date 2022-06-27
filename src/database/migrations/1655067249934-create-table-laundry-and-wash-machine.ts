import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableLaundryAndWashMachine1655067249934 implements MigrationInterface {
    name = 'createTableLaundryAndWashMachine1655067249934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wash_machine" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" smallint NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "model" character varying NOT NULL, "number" integer NOT NULL, "in_opperation" boolean NOT NULL, "laundry_id" uuid NOT NULL, CONSTRAINT "PK_3e7303ace156c3a14acd76cae3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "laundry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" smallint NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying NOT NULL, "address" character varying NOT NULL, "responsible_id" uuid, CONSTRAINT "REL_204be6b8064cfd96b495cfa849" UNIQUE ("responsible_id"), CONSTRAINT "PK_09d25a86f836dc67b26cacaae1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wash_machine" ADD CONSTRAINT "FK_f278813d49495505ee039b96ef2" FOREIGN KEY ("laundry_id") REFERENCES "laundry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "laundry" ADD CONSTRAINT "FK_204be6b8064cfd96b495cfa8499" FOREIGN KEY ("responsible_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laundry" DROP CONSTRAINT "FK_204be6b8064cfd96b495cfa8499"`);
        await queryRunner.query(`ALTER TABLE "wash_machine" DROP CONSTRAINT "FK_f278813d49495505ee039b96ef2"`);
        await queryRunner.query(`DROP TABLE "laundry"`);
        await queryRunner.query(`DROP TABLE "wash_machine"`);
    }
}
