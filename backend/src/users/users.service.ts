import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: any): Promise<User> {
        // Generate NEST ID
        // Format: NN-[COMMUNITY]-[YEAR]-[SEQUENCE]
        // Example: NN-LAB-25-000123

        const communityCode = this.getCommunityCode(createUserDto.community);
        const year = new Date().getFullYear().toString().slice(-2);

        // Simple random sequence for now to avoid collision without a separate counter collection
        // In production, use a Counter model.
        const sequence = Math.floor(100000 + Math.random() * 900000).toString();

        const nestId = `NN-${communityCode}-${year}-${sequence}`;

        const createdUser = new this.userModel({
            ...createUserDto,
            nestId
        });
        return createdUser.save();
    }

    private getCommunityCode(community: string): string {
        const map: Record<string, string> = {
            'auto': 'AUT',
            'dukandar': 'DUK',
            'labour': 'LAB',
            'taxi': 'TAX',
            'farmer': 'FRM',
            'delivery': 'DEL',
            'electrician': 'ELE',
            'plumber': 'PLU'
        };
        return map[community?.toLowerCase()] || 'GEN';
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).select('+password').exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: any): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async findByNestId(nestId: string): Promise<User | null> {
        return this.userModel.findOne({ nestId }).select('fullName photo community nestId createdAt isEmailVerified').exec();
    }

    async verifyDocuments(userId: string): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(userId, { isDocumentVerified: true }, { new: true }).exec();
    }

    async seedAdmin(adminDetails: any) {
        const existingAdmin = await this.userModel.findOne({ email: adminDetails.email });
        if (!existingAdmin) {
            // Create admin
            // We need to hash password explicitly here because create() usually takes DTO, 
            // but we want to ensure password is hashed. 
            // Actually, if we use the auth service's register logic or just manually hash here.
            // Since this is a service method, let's assume we pass hashed password or hash it here.
            // To avoid circular dependency with AuthService, we'll hash it here.
            // We need bcrypt.
            const bcrypt = require('bcrypt');
            const hashedPassword = await bcrypt.hash(adminDetails.password, 10);

            const admin = new this.userModel({
                ...adminDetails,
                password: hashedPassword,
                role: 'admin',
                nestId: 'NN-ADMIN-001',
                isEmailVerified: true
            });
            await admin.save();
            console.log('Admin seeded successfully:', adminDetails.email);
        } else {
            console.log('Admin already exists.');
        }
    }
}
