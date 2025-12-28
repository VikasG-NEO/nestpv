
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument, Transaction, TransactionDocument } from '../schemas/wallet.schema';

@Injectable()
export class WalletService {
    constructor(
        @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
    ) { }

    async getBalance(userId: string): Promise<WalletDocument> {
        let wallet = await this.walletModel.findOne({ userId }).exec();
        if (!wallet) {
            wallet = new this.walletModel({ userId, balance: 0 });
            await wallet.save();
        }
        return wallet;
    }

    async addMoney(userId: string, amount: number) {
        const wallet = await this.getBalance(userId);
        wallet.balance += amount;
        await wallet.save();
        await this.transactionModel.create({
            userId, type: 'credit', amount, description: 'Added money to wallet', status: 'completed'
        });
        return wallet;
    }

    async withdraw(userId: string, amount: number) {
        const wallet = await this.getBalance(userId);
        if (wallet.balance < amount) throw new BadRequestException('Insufficient balance');
        wallet.balance -= amount;
        await wallet.save();
        await this.transactionModel.create({
            userId, type: 'debit', amount, description: 'Withdrawal', status: 'pending'
        });
        return wallet;
    }

    async transfer(fromId: string, toId: string, amount: number) {
        const fromWallet = await this.getBalance(fromId);
        if (fromWallet.balance < amount) throw new BadRequestException('Insufficient balance');

        const toWallet = await this.getBalance(toId);

        fromWallet.balance -= amount;
        await fromWallet.save();

        toWallet.balance += amount;
        await toWallet.save();

        await this.transactionModel.create({
            userId: fromId, type: 'debit', amount, description: `Transfer to ${toId}`, status: 'completed'
        });
        await this.transactionModel.create({
            userId: toId, type: 'credit', amount, description: `Transfer from ${fromId}`, status: 'completed'
        });

        return { status: 'success' };
    }
}
