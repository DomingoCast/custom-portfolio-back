import { MigrationInterface, QueryRunner } from "typeorm";
import { Role } from "../../../core/domain/user/role.enum";
import createHashFunction from "../../password/create-hash-function";

export class first1652179533170 implements MigrationInterface {
    name = "first1652179533170";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "surname" character varying(30) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "phone" character varying(30) NOT NULL, "address" character varying(100) NOT NULL, "role" character varying(100) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `INSERT INTO "user" ("name" , "surname" , "email" , "password" , "phone" , "address" , "role") VALUES ('${
                process.env.ADMIN_NAME
            }','${process.env.ADMIN_SURNAME}','${
                process.env.ADMIN_EMAIL
            }','${await createHashFunction().hash(
                process.env.ADMIN_PASSWORD!
            )}','${process.env.ADMIN_PHONE}','${process.env.ADMIN_ADRESS}','${
                Role.admin
            }')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
