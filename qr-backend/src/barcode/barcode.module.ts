import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodeService } from './barcode.service';
import { BarcodeController } from './barcode.controller';
import { BarcodeEntity } from './barcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarcodeEntity])],
  controllers: [BarcodeController],
  providers: [BarcodeService],
})
export class BarcodeModule {}
