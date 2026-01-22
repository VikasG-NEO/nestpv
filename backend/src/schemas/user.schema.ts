
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, index: true })
  email: string;

  @Prop({ select: false }) // Hide password by default
  password?: string;

  @Prop({ unique: true, index: true })
  phone: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  photo?: string; // URL

  @Prop({ unique: true, index: true })
  nestId: string; // e.g. NN-LAB-25-000123

  @Prop()
  role: 'user' | 'admin' = 'user';

  @Prop()
  community?: string; // e.g. 'labour', 'auto'

  // Profile Details
  @Prop()
  age?: number;

  @Prop()
  gender?: string;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  state?: string;

  @Prop()
  country?: string;

  @Prop({ default: false })
  idCardGenerated: boolean;

  @Prop({ default: false })
  isDocumentVerified: boolean;

  @Prop({ type: Object })
  metadata?: Record<string, any>; // Flex field for future needs

  @Prop()
  referredBy?: string; // NestID of the referrer
}

export const UserSchema = SchemaFactory.createForClass(User);
