import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MatchdayService } from './matchday.service';
import { CreateMatchdayDto } from './dto/create-matchday.dto';
import { UpdateMatchdayDto } from './dto/update-matchday.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('matchday')
@Controller('matchday')
export class MatchdayController {
  constructor(private readonly matchdayService: MatchdayService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createMatchdayDto: CreateMatchdayDto) {
    return this.matchdayService.create(createMatchdayDto);
  }

  @Get()
  findAll() {
    return this.matchdayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchdayService.findOne(+id);
  }

  @Get('number/:number')
  findOneByMatchdayNumber(@Param('number') number: string) {
    return this.matchdayService.findOneByMatchdayNumber(+number);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMatchdayDto: UpdateMatchdayDto,
  ) {
    return this.matchdayService.update(+id, updateMatchdayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchdayService.remove(+id);
  }
}
