import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CupService } from './cup.service';
import { CreateCupDto } from './dto/create-cup.dto';
import { UpdateCupDto } from './dto/update-cup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cup')
@Controller('cup')
export class CupController {
  constructor(private readonly cupService: CupService) {}

  @Post()
  create(@Body() createCupDto: CreateCupDto) {
    return this.cupService.create(createCupDto);
  }

  @Get()
  findAll() {
    return this.cupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCupDto: UpdateCupDto) {
    return this.cupService.update(id, updateCupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cupService.remove(id);
  }
}
