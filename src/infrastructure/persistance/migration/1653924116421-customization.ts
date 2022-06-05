import { MigrationInterface, QueryRunner } from "typeorm";

export class customization1653924116421 implements MigrationInterface {
    name = "customization1653924116421";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "customization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fontFamily" character varying(30) NOT NULL, "fontColor" character varying(30) NOT NULL, "primaryColour" character varying(30) NOT NULL, "secondaryColour" character varying(30) NOT NULL, "gridStyle" character varying(30) NOT NULL, "userId" uuid, CONSTRAINT "REL_ba5caff0f51c654eb61e3546eb" UNIQUE ("userId"), CONSTRAINT "PK_84a03b14b9552682719741f4b14" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "customization" ADD CONSTRAINT "FK_ba5caff0f51c654eb61e3546eba" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "customization" DROP CONSTRAINT "FK_ba5caff0f51c654eb61e3546eba"`
        );
        await queryRunner.query(`DROP TABLE "customization"`);
    }
}
