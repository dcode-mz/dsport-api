import { Test, TestingModule } from '@nestjs/testing';
import { CupService } from './cup.service';

describe('CupService', () => {
  let service: CupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CupService],
    }).compile();

    service = module.get<CupService>(CupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
