import { Controller, Get, Patch, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('stats')
    getStats() {
        return this.adminService.getDashboardStats();
    }

    @Get('activity')
    getActivity() {
        return this.adminService.getSystemActivity();
    }

    @Post('analytics/view')
    trackView(@Body() body: { path: string, userId?: string }) {
        return this.adminService.trackPageView(body.path, body.userId);
    }

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
