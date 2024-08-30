import { Module } from '@nestjs/common';
import { StageService } from './stage.service';

@Module({
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}
