import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Postmigration1728429283665 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
