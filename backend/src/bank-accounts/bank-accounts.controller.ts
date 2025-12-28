
import { Controller, Get, Post, Body, Delete, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bank-accounts')
export class BankAccountsController {
    constructor(private readonly bankAccountsService: BankAccountsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(@Request() req) {
        return this.bankAccountsService.findAll(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req, @Body() createDto: any) {
        return this.bankAccountsService.create(req.user.userId, createDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        return this.bankAccountsService.remove(req.user.userId, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/primary')
    setPrimary(@Request() req, @Param('id') id: string) {
        return this.bankAccountsService.setPrimary(req.user.userId, id);
    }
}
