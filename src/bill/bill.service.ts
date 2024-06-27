import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bill } from './entities/bill.entity';
import { CreateBillDto, UpdateBillDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BillService {
  defaultLimit: number;
  constructor(
    @InjectModel(Bill.name)
    private readonly billModel: Model<Bill>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  private readonly logger = new Logger(BillService.name);

  async create(createBillDto: CreateBillDto) {
    try {
      const bill = await this.billModel.create(createBillDto);
      this.logger.log(bill.$model);
      return bill;
    } catch (error) {
      this.handleDbException(error, createBillDto.description);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    const bills = await this.billModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ dueDate: 1 })
      .select('-__v');
    return bills;
  }

  async findOne(id: string) {
    const bill: Bill = await this.billModel.findById(id);
    return bill;
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    const bill = await this.findOne(id);

    try {
      const newBill = await bill.updateOne(updateBillDto, { new: true });
      console.log(newBill);
      return { ...bill, ...updateBillDto };
    } catch (error) {
      this.handleDbException(error, updateBillDto.description);
    }
  }

  async remove(id: string) {
    const bill = await this.billModel.findByIdAndDelete(id);
    if (!bill) {
      throw new BadRequestException(`Bill with id ${id} not found`);
    }

    return bill;
  }

  private handleDbException(error: any, description: string) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Bill ${JSON.stringify(error.keyValue)} already exists in the database`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create or update Bill ${description} - Check server log`,
    );
  }
}
