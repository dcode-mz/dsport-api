import { Test, TestingModule } from '@nestjs/testing';
import { RefereeController } from './referee.controller';
import { RefereeService } from './referee.service';

describe('RefereeController', () => {
  let controller: RefereeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefereeController],
      providers: [RefereeService],
    }).compile();

    controller = module.get<RefereeController>(RefereeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
