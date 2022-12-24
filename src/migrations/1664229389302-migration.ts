import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class migration1664229389302 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'root',
      new TableColumn({
        name: 'timestamp',
        type: 'datetime',
        default: new Date(),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn('root', 'timestamp');
  }
}
