import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RecurringBillModule } from 'src/recurring-bill/recurring-bill.module';

@Module({
  imports: [RecurringBillModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
