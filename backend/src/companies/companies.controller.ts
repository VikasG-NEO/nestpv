
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req, @Body() createCompanyDto: any) {
        return this.companiesService.create({ ...createCompanyDto, userId: req.user.userId });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my')
    getMyAndList(@Request() req) {
        return this.companiesService.findAllByUser(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companiesService.findById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('jwt'))
    @Post('upload')
    uploadFiles(@Request() req) {
        // File upload with Fastify requires different handling
        return { message: 'File upload temporarily disabled in Fastify mode' };
    }
}
