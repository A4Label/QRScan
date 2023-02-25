import { Test } from '@nestjs/testing';
import { BarcodeController } from './barcode.controller';
import { BarcodeEntity } from './barcode.entity';
import { BarcodeService } from './barcode.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { TypeOrmSQLITETestingModule } from '../test-utils/TypeORMSQLITETestingModule';
import { testDatasetSeed } from '../test-utils/testDataset.seed';

describe('Test BarcodeService', () => {
  let controller: BarcodeController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      controllers: [BarcodeController],
      providers: [BarcodeService],
    }).compile();

    controller = module.get<BarcodeController>(BarcodeController);
  });

  beforeEach(async () => {
    await testDatasetSeed();
  });

  it('should find, create and remove Barcode properly', async () => {
    const barcode: CreateBarcodeDto = { content: 'test' };
    const createRes = await controller.create(barcode);
    let findAllRes = await controller.findAll();

    expect(typeof findAllRes).toBe('object');
    expect(
      findAllRes.filter((bc: BarcodeEntity) => bc.content === 'test').length,
    ).toBe(1);

    await controller.remove(createRes.id);
    findAllRes = await controller.findAll();

    expect(typeof findAllRes).toBe('object');
    expect(
      findAllRes.filter((bc: BarcodeEntity) => bc.content === 'test').length,
    ).toBe(0);
  });
});
