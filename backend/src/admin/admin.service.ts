import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Analytics, AnalyticsDocument } from '../schemas/analytics.schema';
import { CompaniesService } from '../companies/companies.service';
import { SchemesService } from '../schemes/schemes.service';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Analytics.name) private analyticsModel: Model<AnalyticsDocument>,
        private companiesService: CompaniesService,
        private schemesService: SchemesService
    ) { }

    async getPendingRegistrations() {
        return this.companiesService.findAllPending();
    }

    async updateRegistrationStatus(id: string, status: string, reason?: string) {
        return this.companiesService.update(id, { status, rejectionReason: reason });
    }

    async updateSchemeApplicationStatus(id: string, status: string) {
        return this.schemesService.updateApplicationStatus(id, status);
    }

    async getDashboardStats() {
        const totalUsers = await this.userModel.countDocuments();

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const usersToday = await this.userModel.countDocuments({
            createdAt: { $gte: startOfDay }
        });

        const totalViews = await this.analyticsModel.countDocuments({ type: 'pageview' });

        return {
            totalUsers,
            usersToday,
            totalViews
        };
    }

    async trackPageView(path: string, userId?: string) {
        return this.analyticsModel.create({
            type: 'pageview',
            path,
            userId
        });
    }

    async getSystemActivity() {
        return this.analyticsModel.find().sort({ createdAt: -1 }).limit(50);
    }
}
