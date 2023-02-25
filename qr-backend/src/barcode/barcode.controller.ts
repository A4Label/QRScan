import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';

@Controller('barcode')
export class BarcodeController {
  constructor(private readonly service: BarcodeService) {}

  @Post()
  create(@Body() barcode: CreateBarcodeDto) {
    return this.service.create(barcode);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
