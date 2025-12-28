
import { Injectable } from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service';
import { SchemesService } from '../schemes/schemes.service';

@Injectable()
export class AdminService {
    constructor(
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
}
