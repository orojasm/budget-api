import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurringBillDto } from './create-recurring-bill.dto';

export class UpdateRecurringBillDto extends PartialType(
  CreateRecurringBillDto,
) {
  /**
   * RecurringBill database key.
   */
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly _id?: string;

  /**
   * RecurringBill status (see RecurringBillStatus type)
   */
  @IsString()
  readonly status?: string;
}
