import { Injectable } from '@nestjs/common';
import { CreateCupDto } from './dto/create-cup.dto';
import { UpdateCupDto } from './dto/update-cup.dto';

@Injectable()
export class CupService {
  create(createCupDto: CreateCupDto) {
    return 'This action adds a new cup';
  }

  findAll() {
    return `This action returns all cup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cup`;
  }

  update(id: number, updateCupDto: UpdateCupDto) {
    return `This action updates a #${id} cup`;
  }

  remove(id: number) {
    return `This action removes a #${id} cup`;
  }
}
