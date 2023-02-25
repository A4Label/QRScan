import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { BarcodeEntity } from './barcode.entity';

@Injectable()
export class BarcodeService {
  constructor(
    @InjectRepository(BarcodeEntity)
    private repository: Repository<BarcodeEntity>,
  ) {}

  async create(createBarcodeDto: CreateBarcodeDto) {
    const post = this.repository.create({ ...createBarcodeDto });

    await this.repository.save(post);
    return post;
  }

  async findAll(): Promise<BarcodeEntity[]> {
    return this.repository.find();
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
