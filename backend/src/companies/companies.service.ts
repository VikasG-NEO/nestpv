
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) { }

    async create(createCompanyDto: any): Promise<Company> {
        const createdCompany = new this.companyModel(createCompanyDto);
        return createdCompany.save();
    }

    async findAllByUser(userId: string): Promise<Company[]> {
        return this.companyModel.find({ userId }).exec();
    }

    async findById(id: string): Promise<Company | null> {
        return this.companyModel.findById(id).exec();
    }

    async update(id: string, updateCompanyDto: any): Promise<Company | null> {
        return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true }).exec();
    }

    async findAllPending(): Promise<Company[]> {
        return this.companyModel.find({ status: 'pending' }).exec();
    }
}
