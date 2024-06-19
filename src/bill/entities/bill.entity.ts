import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bill extends Document {
  /**
   * Bill database key
   */
  // @Prop({ unique: true, index: true })
  // id: number;

  /**
   * The display name for the bill
   */
  @Prop()
  description: string;

  /**
   * Bill accounting period ('yyyy/mm' format)
   */
  @Prop()
  period: string;

  /**
   * Projected payment date (DateTime format)
   */
  @Prop()
  dueDate: string;

  /**
   * Projected payment date (DateTime format)
   */
  @Prop()
  paymentDate: string;

  /**
   * Website where you could pay this bill
   */
  @Prop()
  web: string;

  /**
   * Payment reference for this bill
   */
  @Prop()
  ref: string;

  /**
   * Currency to which the value of the bill corresponds
   */
  @Prop()
  currency: string;

  /**
   * The amount to be paid on this bill
   */
  @Prop()
  amount: number;

  /**
   * Budget to which the bill corresponds
   */
  @Prop()
  budget: string;

  /**
   * Category to which this invoice belongs
   */
  @Prop()
  category: string;

  /**
   * set of labels that characterize this bill
   */
  @Prop()
  tags: string[];

  /**
   * Refers to the source account involved in an accounting transaction.
   * This account is used to record the money that comes in (in a revenue)
   * or goes out (in an expense) for the company.
   */
  @Prop()
  sourceAccount: string;

  /**
   * Refers to the destination account involved in an accounting transaction.
   * This account is used to record the money that comes in (in a expense)
   * or goes out (in an revenue) for the company.
   */
  @Prop()
  destinationAccount: string;

  /**
   * Bill status (see BillStatus type)
   */
  @Prop({ default: 'initial' })
  status: string;

  /**
   * Bill creation date
   */
  @Prop({ required: false })
  createAt?: string;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
