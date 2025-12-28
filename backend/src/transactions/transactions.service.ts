
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../schemas/wallet.schema';

@Injectable()
export class TransactionsService {
    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) { }

    async findAllByUser(userId: string, page: number = 1, limit: number = 20): Promise<Transaction[]> {
        return this.transactionModel.find({ userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }

    async findById(id: string): Promise<Transaction | null> {
        return this.transactionModel.findById(id).exec();
    }
}
