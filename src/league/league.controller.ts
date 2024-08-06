import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('league')
@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueService.create(createLeagueDto);
  }

  @Get()
  findAll() {
    return this.leagueService.findAll();
  }

  
  @Get('leagues')
  findLeaguesWithPlayers(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
    return this.leagueService.findLeaguesWithClubs(ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leagueService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
    return this.leagueService.update(id, updateLeagueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leagueService.remove(id);
  }

  // @Get('sport/:id')
  // findAllFromSportId(@Param('id') id: string) {
  //   return this.leagueService.findAllFromSportId(id);
  // }

  // @Get('sports')
  // findAllFromSportsIds(@Query('ids') ids: string) {
  //   const sportIds = ids.split(',');
  //   console.log(sportIds)
  //   return this.leagueService.findAllLeguesfromSomeSports(sportIds);
  // }
}
