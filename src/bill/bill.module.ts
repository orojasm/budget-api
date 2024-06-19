import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill, BillSchema } from './entities/bill.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bill.name,
        schema: BillSchema,
      },
    ]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
