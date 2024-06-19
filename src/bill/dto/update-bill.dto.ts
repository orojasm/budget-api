import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';

export class UpdateBillDto extends PartialType(CreateBillDto) {
  /**
   * Bill database key.
   */
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly _id?: string;

  /**
   * Bill payment date
   */
  @IsString()
  readonly paymentDate: string;

  /**
   * Bill status (see BillStatus type)
   */
  @IsString()
  readonly status?: string;
}
