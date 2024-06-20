import { Test, TestingModule } from '@nestjs/testing';
import { RecurringBillController } from './recurring-bill.controller';
import { RecurringBillService } from './recurring-bill.service';

describe('RecurringBillController', () => {
  let controller: RecurringBillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurringBillController],
      providers: [RecurringBillService],
    }).compile();

    controller = module.get<RecurringBillController>(RecurringBillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
