import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { LeagueModule } from 'src/league/league.module';
import { SportModule } from 'src/sport/sport.module';

@Module({
  controllers: [ClubController],
  providers: [ClubService],
  imports: [LeagueModule, SportModule],
})
export class ClubModule {}
