
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SchemesService } from './schemes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('schemes')
export class SchemesController {
    constructor(private readonly schemesService: SchemesService) { }

    @Get()
    async findAll() {
        return this.schemesService.findAllSchemes();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('apply')
    async apply(@Request() req, @Body() body: { schemeId: string; documents: string[] }) {
        // Note: UserScheme schema currently does not store documents. 
        // Ideally update schema to include documents array if needed.
        return this.schemesService.apply(req.user.userId, body.schemeId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-applications')
    async getMyApplications(@Request() req) {
        return this.schemesService.getMyApplications(req.user.userId);
    }
}
