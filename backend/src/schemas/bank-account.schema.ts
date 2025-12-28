
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BankAccountDocument = BankAccount & Document;

@Schema({ timestamps: true })
export class BankAccount {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ required: true })
    accountHolder: string;

    @Prop({ required: true })
    accountNumber: string;

    @Prop({ required: true })
    ifscCode: string;

    @Prop({ required: true })
    bankName: string;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ default: false })
    isPrimary: boolean;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
