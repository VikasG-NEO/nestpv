
import { Controller, Get, Patch, Body, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('registrations')
    getRegistrations(@Query('status') status: string) {
        return this.adminService.getPendingRegistrations();
    }

    @Patch('registrations/:id')
    approveRegistration(@Param('id') id: string, @Body() body: { status: string; reason?: string }) {
        return this.adminService.updateRegistrationStatus(id, body.status, body.reason);
    }

    @Patch('schemes/applications/:id')
    approveSchemeApplication(@Param('id') id: string, @Body() body: { status: string }) {
        return this.adminService.updateSchemeApplicationStatus(id, body.status);
    }
}
