
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankAccount, BankAccountDocument } from '../schemas/bank-account.schema';

@Injectable()
export class BankAccountsService {
    constructor(@InjectModel(BankAccount.name) private bankAccountModel: Model<BankAccountDocument>) { }

    async findAll(userId: string): Promise<BankAccount[]> {
        return this.bankAccountModel.find({ userId }).exec();
    }

    async create(userId: string, createDto: any): Promise<BankAccount> {
        const account = new this.bankAccountModel({ ...createDto, userId });
        return account.save();
    }

    async remove(userId: string, id: string): Promise<any> {
        return this.bankAccountModel.findOneAndDelete({ _id: id, userId }).exec();
    }

    async setPrimary(userId: string, id: string): Promise<BankAccount | null> {
        // Unset others
        await this.bankAccountModel.updateMany({ userId }, { isPrimary: false }).exec();
        // Set this one
        return this.bankAccountModel.findByIdAndUpdate(id, { isPrimary: true }, { new: true }).exec();
    }
}
