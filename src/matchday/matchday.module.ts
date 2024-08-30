import { Module } from '@nestjs/common';
import { MatchdayService } from './matchday.service';
import { MatchdayController } from './matchday.controller';

@Module({
  controllers: [MatchdayController],
  providers: [MatchdayService],
  exports: [MatchdayService],
})
export class MatchdayModule {}
