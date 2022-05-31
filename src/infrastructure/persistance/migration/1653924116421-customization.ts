import { MigrationInterface, QueryRunner } from "typeorm";

export class customization1653924116421 implements MigrationInterface {
    name = 'customization1653924116421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fontFamily" character varying(30) NOT NULL, "fontColor" character varying(30) NOT NULL, "primaryColour" character varying(30) NOT NULL, "secondaryColour" character varying(30) NOT NULL, "gridStyle" character varying(30) NOT NULL, "userId" character varying, CONSTRAINT "REL_ba5caff0f51c654eb61e3546eb" UNIQUE ("userId"), CONSTRAINT "PK_84a03b14b9552682719741f4b14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_ca25eb01f75a85272300f336029"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_a39174eef6065edf7f0432d7610"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "collectionId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "collectionId" character varying`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_ca25eb01f75a85272300f336029" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_a39174eef6065edf7f0432d7610" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customization" ADD CONSTRAINT "FK_ba5caff0f51c654eb61e3546eba" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customization" DROP CONSTRAINT "FK_ba5caff0f51c654eb61e3546eba"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_a39174eef6065edf7f0432d7610"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_ca25eb01f75a85272300f336029"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "collectionId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "collectionId" uuid`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_a39174eef6065edf7f0432d7610" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_ca25eb01f75a85272300f336029" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "customization"`);
    }

}
