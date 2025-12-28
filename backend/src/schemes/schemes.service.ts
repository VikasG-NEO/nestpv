
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scheme, SchemeDocument, UserScheme, UserSchemeDocument } from '../schemas/scheme.schema';

@Injectable()
export class SchemesService {
    constructor(
        @InjectModel(Scheme.name) private schemeModel: Model<SchemeDocument>,
        @InjectModel(UserScheme.name) private userSchemeModel: Model<UserSchemeDocument>
    ) { }

    async findAllSchemes(): Promise<Scheme[]> {
        return this.schemeModel.find({ isActive: true }).exec();
    }

    async apply(userId: string, schemeId: string): Promise<UserScheme> {
        const existing = await this.userSchemeModel.findOne({ userId, schemeId }).exec();
        if (existing) return existing;

        const application = new this.userSchemeModel({
            userId,
            schemeId,
            applicationDate: new Date()
        });
        return application.save();
    }

    async getMyApplications(userId: string): Promise<UserScheme[]> {
        return this.userSchemeModel.find({ userId }).populate('schemeId').exec();
    }

    async findAllApplications(): Promise<UserScheme[]> {
        return this.userSchemeModel.find().populate('userId').populate('schemeId').exec();
    }

    async updateApplicationStatus(id: string, status: string): Promise<UserScheme | null> {
        return this.userSchemeModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    }
}
