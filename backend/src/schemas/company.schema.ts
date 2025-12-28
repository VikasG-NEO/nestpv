
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string; // Link to owner

    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    ownerName: string;

    @Prop({ required: true })
    mobile: string;

    @Prop()
    email?: string;

    @Prop({ required: true, enum: ['auto', 'dukandar', 'labour', 'delivery', 'farmer', 'electrician'] })
    community: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    pincode: string;

    @Prop()
    description?: string;

    @Prop([String])
    shopImages: string[]; // Array of URLs

    @Prop([String])
    documents: string[]; // Array of URLs

    @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
    status: string;

    @Prop()
    rejectionReason?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
