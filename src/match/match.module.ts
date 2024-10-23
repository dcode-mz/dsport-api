import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { ClubModule } from 'src/club/club.module';
import { MatchdayModule } from 'src/matchday/matchday.module';
import { TeamModule } from 'src/team/team.module';

@Module({
  controllers: [MatchController],
  providers: [MatchService],
  imports: [ClubModule, TeamModule, MatchdayModule],
})
export class MatchModule {}
