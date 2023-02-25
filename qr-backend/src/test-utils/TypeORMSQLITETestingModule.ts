import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodeEntity } from '../barcode/barcode.entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [BarcodeEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([BarcodeEntity]),
];
