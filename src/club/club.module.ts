import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { TournamentModule } from 'src/tournament/tournament.module';
import { SportModule } from 'src/sport/sport.module';

@Module({
  controllers: [ClubController],
  providers: [ClubService],
  imports: [TournamentModule, SportModule],
  exports: [ClubService],
})
export class ClubModule {}
