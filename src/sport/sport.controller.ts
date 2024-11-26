import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SportService } from './sport.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseBody } from 'src/common/dto/ResponseBody';

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
  async findSportsWithTournaments(@Res() res: Response) {
    const response: ResponseBody<SportsTournamentsResponse[]> =
      await this.sportService.findSportsWithTournaments();

    res.status(HttpStatus.OK).json(response);
  }

  @Get('clubs')
  async findSportsWithTournamentsAndClubs(@Res() res: Response) {
    const response: ResponseBody<SportsClubsResponse[]> =
      await this.sportService.findSportsWithTournamentsAndClubs();

    res.status(HttpStatus.OK).json(response);
  }

  @Get(':id/matches')
  async getMatchesBySport(
    @Param('id') id: string,
    @Query('date') matchDate: string,
    @Res() res: Response,
  ) {
    const response = await this.sportService.getMatchesBySportAndDate(
      id,
      matchDate,
    );

    res.status(HttpStatus.OK).json(response);
  }

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
