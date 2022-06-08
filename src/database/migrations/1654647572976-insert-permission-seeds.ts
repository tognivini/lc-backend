import { MigrationInterface, QueryRunner } from "typeorm"

export class insertPermissionSeeds1654647572976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.query(
            "INSERT INTO permissions (type) VALUES ('ADMIN')"
          )
          await queryRunner.manager.query(
            "INSERT INTO permissions (type) VALUES ('CLIENTE')"
          )
          await queryRunner.manager.query(
            "INSERT INTO permissions (type) VALUES ('BOLSISTA')"
          )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
