import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecurringBillService } from './recurring-bill.service';
import { CreateRecurringBillDto, UpdateRecurringBillDto } from './dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('recurring-bills')
export class RecurringBillController {
  constructor(private readonly recurringBillService: RecurringBillService) {}

  @Post()
  create(@Body() createRecurringBillDto: CreateRecurringBillDto) {
    return this.recurringBillService.create(createRecurringBillDto);
  }

  @Get()
  findAll() {
    return this.recurringBillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.recurringBillService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateRecurringBillDto: UpdateRecurringBillDto,
  ) {
    return this.recurringBillService.update(id, updateRecurringBillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.recurringBillService.remove(id);
  }
}
