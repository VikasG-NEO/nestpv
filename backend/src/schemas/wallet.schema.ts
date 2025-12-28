
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/* --- Wallet --- */
export type WalletDocument = Wallet & Document;

@Schema({ timestamps: true })
export class Wallet {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', unique: true, required: true })
    userId: string;

    @Prop({ default: 0 })
    balance: number;

    @Prop({ default: 'INR' })
    currency: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

/* --- Transaction --- */
export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ required: true, enum: ['credit', 'debit'] })
    type: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    description: string;

    @Prop({ default: 'Other' })
    category: string; // e.g., 'Wallet', 'Event', 'Cashback'

    @Prop({ default: 'completed', enum: ['pending', 'completed', 'failed'] })
    status: string;

    // Optional reference if transaction is linked to a specific entity (e.g. Order ID)
    @Prop()
    referenceId?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
