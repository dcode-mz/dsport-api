import { Test, TestingModule } from '@nestjs/testing';
import { RefereeService } from './referee.service';

describe('RefereeService', () => {
  let service: RefereeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefereeService],
    }).compile();

    service = module.get<RefereeService>(RefereeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
