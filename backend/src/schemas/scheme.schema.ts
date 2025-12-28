
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/* --- Master Scheme (Admin Managed) --- */
export type SchemeDocument = Scheme & Document;

@Schema({ timestamps: true })
export class Scheme {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    category: string; // e.g., 'Insurance', 'Healthcare', 'Education'

    @Prop({ required: true })
    eligibility: string;

    @Prop({ required: true })
    benefits: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const SchemeSchema = SchemaFactory.createForClass(Scheme);

/* --- User Application to Scheme --- */
export type UserSchemeDocument = UserScheme & Document;

@Schema({ timestamps: true })
export class UserScheme {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Scheme', required: true })
    schemeId: string;

    @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
    status: string;

    @Prop()
    applicationDate: Date; // Can use createdAt from timestamp as well

    @Prop()
    adminNotes?: string;
}

export const UserSchemeSchema = SchemaFactory.createForClass(UserScheme);
