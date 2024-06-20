import { Controller, Get, Param } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  populateRecurringBill() {
    return this.seedService.populateRecurringBill();
  }

  @Get(':period')
  populateBill(@Param('period') period: string) {
    return this.seedService.populateBill(period);
  }
}
