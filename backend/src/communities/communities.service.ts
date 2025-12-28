
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Community, CommunityDocument, Message, MessageDocument } from '../schemas/community.schema';

@Injectable()
export class CommunitiesService {
    constructor(
        @InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>
    ) { }

    async findAll(): Promise<Community[]> {
        return this.communityModel.find().exec();
    }

    async create(createDto: any): Promise<Community> {
        const community = new this.communityModel(createDto);
        return community.save();
    }

    async join(communityId: string, userId: string): Promise<Community | null> {
        return this.communityModel.findByIdAndUpdate(
            communityId,
            { $addToSet: { members: userId } },
            { new: true }
        ).exec();
    }

    async getMessages(communityId: string, limit: number = 50): Promise<Message[]> {
        return this.messageModel.find({ communityId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('userId', 'fullName photo')
            .exec();
    }

    async sendMessage(userId: string, communityId: string, text: string): Promise<Message> {
        const message = new this.messageModel({ userId, communityId, text });
        return message.save();
    }
}
