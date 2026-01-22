import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Analytics, AnalyticsDocument } from '../schemas/analytics.schema';
import { Transaction, TransactionDocument } from '../schemas/wallet.schema';
import { CompaniesService } from '../companies/companies.service';
import { SchemesService } from '../schemes/schemes.service';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Analytics.name) private analyticsModel: Model<AnalyticsDocument>,
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
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
        const [analytics, transactions] = await Promise.all([
            this.analyticsModel.find().sort({ createdAt: -1 }).limit(50).lean().exec(),
            this.transactionModel.find().sort({ createdAt: -1 }).limit(20).lean().exec()
        ]);

        const combined = [
            ...analytics.map(a => ({
                type: 'view',
                path: a.path,
                userId: a.userId,
                createdAt: a.createdAt
            })),
            ...transactions.map(t => ({
                type: 'transaction',
                path: t.description, // Use description as 'path' or content
                userId: t.userId,
                amount: t.amount,
                createdAt: t.createdAt
            }))
        ];

        // Sort by createdAt desc
        return combined.sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
        }).slice(0, 50);
    }
}
