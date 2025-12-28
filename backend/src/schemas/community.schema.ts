
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CommunityDocument = Community & Document;

@Schema({ timestamps: true })
export class Community {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    members: string[];
}

export const CommunitySchema = SchemaFactory.createForClass(Community);

/* --- Message --- */
export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Community', required: true })
    communityId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string; // Sender

    @Prop({ required: true })
    text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
