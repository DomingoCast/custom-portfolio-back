import { MigrationInterface, QueryRunner } from "typeorm";

export class all1653115506044 implements MigrationInterface {
    name = "all1653115506044";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "surname" character varying(30) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "phone" character varying(30) NOT NULL, "address" character varying(100) NOT NULL, "role" character varying(100) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "collection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(30) NOT NULL, "description" character varying NOT NULL, "thumbnail" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(30) NOT NULL, "description" character varying NOT NULL, "thumbnail" character varying NOT NULL, "collectionId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "collection" ADD CONSTRAINT "FK_ca25eb01f75a85272300f336029" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_a39174eef6065edf7f0432d7610" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_a39174eef6065edf7f0432d7610"`
        );
        await queryRunner.query(
            `ALTER TABLE "collection" DROP CONSTRAINT "FK_ca25eb01f75a85272300f336029"`
        );
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
