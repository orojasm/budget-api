import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecurringBillService } from './recurring-bill.service';
import { RecurringBillController } from './recurring-bill.controller';
import {
  RecurringBill,
  RecurringBillSchema,
} from './entities/recurring-bill.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecurringBill.name,
        schema: RecurringBillSchema,
      },
    ]),
  ],
  controllers: [RecurringBillController],
  providers: [RecurringBillService],
  exports: [MongooseModule],
})
export class RecurringBillModule {}
