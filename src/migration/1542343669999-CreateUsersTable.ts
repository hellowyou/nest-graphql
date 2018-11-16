import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  CreateDateColumn,
  TableColumn,
} from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

import { generateUniqueConstraintName } from '../utils/typeorm/helpers';
import { DateTimeColumn } from '../utils/typeorm/columns';

export class CreateUsersTable1542343669999 implements MigrationInterface {
  tableName = 'users';

  public async up(queryRunner: QueryRunner): Promise<any> {
    const isNullable = true;

    const table = new Table({
      name: this.tableName,
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
        { name: 'firstName', type: 'varchar', length: '100', isNullable },
        { name: 'lastName', type: 'varchar', length: '100', isNullable },
        { name: 'email', type: 'varchar', length: '254' },
        { name: 'password', type: 'varchar' },
        new DateTimeColumn({ name: 'createdAt' } as TableColumnOptions),
        new DateTimeColumn({ name: 'updatedAt' } as TableColumnOptions),
      ],
    });

    table.addUniqueConstraint(
      new TableIndex({
        name: generateUniqueConstraintName(this.tableName, 'email'),
        columnNames: ['email'],
      }),
    );

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }
}
