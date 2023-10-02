import { Module } from '@nestjs/common';
import { CupService } from './cup.service';
import { CupController } from './cup.controller';

@Module({
  controllers: [CupController],
  providers: [CupService],
})
export class CupModule {}
