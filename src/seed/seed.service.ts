import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecurringBill } from 'src/recurring-bill/entities/recurring-bill.entity';
import { CreateRecurringBillDto } from 'src/recurring-bill/dto';
import { data } from './data/populate';
import { CreateBillDto } from 'src/bill/dto';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectModel(RecurringBill.name)
    private readonly recurringBillModel: Model<RecurringBill>,
  ) {}

  async populateRecurringBill() {
    await this.recurringBillModel.deleteMany();
    await this.recurringBillModel.insertMany(data);
    return;
  }

  async populateBill(period: string) {
    const data = await this.recurringBillModel.find();
    const bills = data.map((recurringBill) => {
      const createBillDto: CreateBillDto = {
        description: recurringBill.description,
        period: period,
        dueDate: recurringBill.dueDate,
        web: recurringBill.web,
        ref: recurringBill.ref,
        currency: recurringBill.currency,
        amount: recurringBill.amount,
        budget: recurringBill.budget,
        category: recurringBill.category,
        tags: recurringBill.tags,
        sourceAccount: recurringBill.sourceAccount,
        destinationAccount: recurringBill.destinationAccount,
      };
      return createBillDto;
    });
    // await this.recurringBillModel.insertMany(data);
    return bills;
  }

  async populate() {
    const data: CreateRecurringBillDto = {
      description: 'Pago Tarjeta Dinners',
      initialPeriod: '202406',
      dueDate: '2024-06-01T08:00:00Z-0500',
      type: 'monthly',
      skip: 0,
      weekend: 'daily',
      end: 'forever',
      web: 'https://www.davivienda.com',
      ref: '',
      currency: 'Peso Colombiano (COL$)',
      amount: 449980,
      budget: 'Pago tarjeta de crédito',
      category: 'Personal',
      tags: ['personal', 'tarjeta de crédito'],
      sourceAccount: 'Davivienda Ahorros',
      destinationAccount: 'Tarjeta de crédito Dinners',
    };
    return this.create(data);
  }

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
