import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RecurringBill } from './entities/recurring-bill.entity';
import { CreateRecurringBillDto, UpdateRecurringBillDto } from './dto';

@Injectable()
export class RecurringBillService {
  private readonly logger = new Logger(RecurringBillService.name);
  constructor(
    @InjectModel(RecurringBill.name)
    private readonly recurringBillModel: Model<RecurringBill>,
  ) {}

  async create(createRecurringBillDto: CreateRecurringBillDto) {
    try {
      const recurringBill = await this.recurringBillModel.create(
        createRecurringBillDto,
      );
      this.logger.log(recurringBill.$model);
      return recurringBill;
    } catch (error) {
      this.handleDbException(error, createRecurringBillDto.description);
    }
  }

  async findAll() {
    const recurringBill = await this.recurringBillModel.find();
    return recurringBill;
  }

  async findOne(id: string) {
    const recurringBill: RecurringBill =
      await this.recurringBillModel.findById(id);
    return recurringBill;
  }

  async update(id: string, updateRecurringBillDto: UpdateRecurringBillDto) {
    const recurringBill = await this.findOne(id);

    try {
      const newBill = await recurringBill.updateOne(updateRecurringBillDto, {
        new: true,
      });
      console.log(newBill);
      return { ...recurringBill, ...updateRecurringBillDto };
    } catch (error) {
      this.handleDbException(error, updateRecurringBillDto.description);
    }
  }

  async remove(id: string) {
    const recurringBill = await this.recurringBillModel.findByIdAndDelete(id);
    if (!recurringBill) {
      throw new BadRequestException(`RecurringBill with id ${id} not found`);
    }

    return recurringBill;
  }

  private handleDbException(error: any, description: string) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `RecurringBill ${JSON.stringify(error.keyValue)} already exists in the database`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create or update RecurringBill ${description} - Check server log`,
    );
  }
}
