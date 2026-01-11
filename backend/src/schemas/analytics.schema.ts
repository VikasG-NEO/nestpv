import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalyticsDocument = Analytics & Document;

@Schema({ timestamps: true })
export class Analytics {
    @Prop({ required: true })
    type: string; // 'pageview', 'action'

    @Prop()
    path: string; // URL path visited

    @Prop()
    userId?: string; // Optional user ID if logged in

    @Prop()
    metadata?: string; // extra info
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
