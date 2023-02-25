import { getConnection } from 'typeorm';
import { BarcodeEntity } from '../barcode/barcode.entity';

export const testDatasetSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  await entityManager.insert<BarcodeEntity>(BarcodeEntity, {
    content: '123123123',
  });
};
