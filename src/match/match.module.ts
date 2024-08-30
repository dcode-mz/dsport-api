import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { ClubModule } from 'src/club/club.module';
import { MatchdayModule } from 'src/matchday/matchday.module';

@Module({
  controllers: [MatchController],
  providers: [MatchService],
  imports: [ClubModule, MatchdayModule],
})
export class MatchModule {}
