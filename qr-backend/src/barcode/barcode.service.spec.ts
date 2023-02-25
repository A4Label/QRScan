import { Test } from '@nestjs/testing';
import { BarcodeService } from './barcode.service';
import { BarcodeEntity } from './barcode.entity';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { TypeOrmSQLITETestingModule } from '../test-utils/TypeORMSQLITETestingModule';
import { testDatasetSeed } from '../test-utils/testDataset.seed';

describe('Test BarcodeService', () => {
  let service: BarcodeService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [BarcodeService],
    }).compile();

    service = module.get<BarcodeService>(BarcodeService);
  });

  beforeEach(async () => {
    await testDatasetSeed();
  });

  it('should find, create and remove Barcode properly', async () => {
    const barcode: CreateBarcodeDto = { content: 'test' };
    const createRes = await service.create(barcode);
    let findAllRes = await service.findAll();

    expect(typeof findAllRes).toBe('object');
    expect(
      findAllRes.filter((bc: BarcodeEntity) => bc.content === 'test').length,
    ).toBe(1);

    await service.remove(createRes.id);
    findAllRes = await service.findAll();

    expect(typeof findAllRes).toBe('object');
    expect(
      findAllRes.filter((bc: BarcodeEntity) => bc.content === 'test').length,
    ).toBe(0);
  });
});
