import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1635689903141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "products",
          columns: [
            { name: "id", isPrimary: true, type: "uuid" },
            {
              name: "name",
              type: "varchar",
            },
            {
              name: "description",
              type: "varchar",
            },
            {
              name: "price",
              type: "numeric",
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "now()",
            },
          ],
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
