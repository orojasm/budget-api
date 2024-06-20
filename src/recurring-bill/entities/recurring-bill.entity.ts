import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RecurringBill extends Document {
  /**
   * The display name for the RecurringBill
   */
  @Prop()
  description: string;
  /**
   * Bill accounting period ('yyyy/mm' format)
   */
  @Prop()
  initialPeriod: string;

  /**
   * Projected payment date (DateTime format)
   */
  @Prop()
  dueDate: string;

  @Prop()
  type: string;

  @Prop()
  skip: number;

  @Prop()
  weekend: string;

  @Prop()
  end: string;

  /**
   * Website where you could pay this RecurringBill
   */
  @Prop()
  web: string;

  /**
   * Payment reference for this RecurringBill
   */
  @Prop()
  ref: string;

  /**
   * Currency to which the value of the RecurringBill corresponds
   */
  @Prop()
  currency: string;

  /**
   * The amount to be paid on this RecurringBill
   */
  @Prop()
  amount: number;

  /**
   * Budget to which the RecurringBill corresponds
   */
  @Prop()
  budget: string;

  /**
   * Category to which this invoice belongs
   */
  @Prop()
  category: string;

  /**
   * set of labels that characterize this RecurringBill
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
   * RecurringBill status (see RecurringBillStatus type)
   */
  @Prop({ default: 'active' })
  status: string;

  /**
   * RecurringBill creation date
   */
  @Prop({ required: false })
  createAt?: string;
}

export const RecurringBillSchema = SchemaFactory.createForClass(RecurringBill);
