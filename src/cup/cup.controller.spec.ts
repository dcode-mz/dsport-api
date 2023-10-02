import { Test, TestingModule } from '@nestjs/testing';
import { CupController } from './cup.controller';
import { CupService } from './cup.service';

describe('CupController', () => {
  let controller: CupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CupController],
      providers: [CupService],
    }).compile();

    controller = module.get<CupController>(CupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
