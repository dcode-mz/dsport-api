import { Module } from '@nestjs/common';
import { RefereeService } from './referee.service';
import { RefereeController } from './referee.controller';

@Module({
  controllers: [RefereeController],
  providers: [RefereeService],
})
export class RefereeModule {}
