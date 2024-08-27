import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SportService } from './sport.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('sports')
@Controller('sports')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createSportDto: CreateSportDto) {
    return this.sportService.create(createSportDto);
  }

  @Get()
  findAll() {
    return this.sportService.findAll();
  }

  @Get('tournaments')
  findSportsWithTournaments() {
    return this.sportService.findSportsWithTournaments();
  }

  @Get('clubs')
  findSportsWithTournamentsAndClubs() {
    return this.sportService.findSportsWithTournamentsAndClubs();
  }

  // @Get('tournaments')
  // findSportsWithTournaments(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
  //   return this.sportService.findSportsWithTournaments(ids);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSportDto: UpdateSportDto) {
    return this.sportService.update(id, updateSportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportService.remove(id);
  }
}
