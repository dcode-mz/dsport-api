import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('club')
@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubService.create(createClubDto);
  }

  @Get()
  findAll() {
    return this.clubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubService.update(id, updateClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubService.remove(id);
  }
}
