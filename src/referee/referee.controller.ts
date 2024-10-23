import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RefereeService } from './referee.service';
import { CreateRefereeDto } from './dto/create-referee.dto';
import { UpdateRefereeDto } from './dto/update-referee.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('referee')
@Controller('referee')
export class RefereeController {
  constructor(private readonly refereeService: RefereeService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createRefereeDto: CreateRefereeDto) {
    return this.refereeService.create(createRefereeDto);
  }

  @Get()
  findAll() {
    return this.refereeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refereeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefereeDto: UpdateRefereeDto) {
    return this.refereeService.update(+id, updateRefereeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refereeService.remove(+id);
  }
}
