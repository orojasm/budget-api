import { Test, TestingModule } from '@nestjs/testing';
import { RecurringBillService } from './recurring-bill.service';

describe('RecurringBillService', () => {
  let service: RecurringBillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecurringBillService],
    }).compile();

    service = module.get<RecurringBillService>(RecurringBillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
