import { Test, TestingModule } from '@nestjs/testing';
import { MatchEventsController } from './match-events.controller';
import { MatchEventsService } from './match-events.service';

describe('MatchEventsController', () => {
  let controller: MatchEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchEventsController],
      providers: [MatchEventsService],
    }).compile();

    controller = module.get<MatchEventsController>(MatchEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
