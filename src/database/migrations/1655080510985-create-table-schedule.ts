import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableSchedule1655080510985 implements MigrationInterface {
    name = 'createTableSchedule1655080510985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" smallint NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "start_hour" character varying NOT NULL, "end_hour" character varying, "situation" character varying, "laundry_id" uuid NOT NULL, "wash_machine_id" uuid NOT NULL, "responsible_id" uuid NOT NULL, "client_id" uuid NOT NULL, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_04b1f6b52809773a5f5c829161c" FOREIGN KEY ("laundry_id") REFERENCES "laundry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_3b76075e73863b817dfa357fe8f" FOREIGN KEY ("wash_machine_id") REFERENCES "wash_machine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_d99f525b09b0c2964b2195a9513" FOREIGN KEY ("responsible_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_c192d4610a2c250924db12c4395" FOREIGN KEY ("client_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_c192d4610a2c250924db12c4395"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_d99f525b09b0c2964b2195a9513"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_3b76075e73863b817dfa357fe8f"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_04b1f6b52809773a5f5c829161c"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
    }

}
