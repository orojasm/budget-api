import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBillDto {
  /**
   * The display name for the bill
   */
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  /**
   * Bill accounting period ('yyyy/mm' format)
   */
  @IsString()
  @MinLength(5)
  readonly period: string;

  /**
   * Bill Due Date
   */
  @IsString()
  readonly dueDate: string;

  /**
   * Website where you could pay this bill
   *  @IsUrl()
   */
  @IsString()
  readonly web: string;

  /**
   * Payment reference for this bill
   */
  @IsString()
  readonly ref: string;

  /**
   * Currency to which the value of the bill corresponds
   */
  @IsString()
  readonly currency: string;

  /**
   * The amount to be paid on this bill
   */
  @IsNumber()
  @IsPositive()
  readonly amount: number;

  /**
   * Budget to which the bill corresponds
   */
  @IsString()
  readonly budget: string;

  /**
   * Category to which this invoice belongs
   */
  @IsString()
  readonly category: string;

  /**
   * set of labels that characterize this bill
   */
  @IsArray()
  readonly tags: string[];

  /**
   * Refers to the source account involved in an accounting transaction.
   * This account is used to record the money that comes in (in a revenue)
   * or goes out (in an expense) for the company.
   */
  @IsString()
  readonly sourceAccount: string;

  /**
   * Refers to the destination account involved in an accounting transaction.
   * This account is used to record the money that comes in (in a expense)
   * or goes out (in an revenue) for the company.
   */
  @IsString()
  readonly destinationAccount: string;

  /**
   * Bill status (see BillStatus type)
   */
  readonly status?: string;

  /**
   * Bill creation date
   */
  readonly createAt?: string;
}
