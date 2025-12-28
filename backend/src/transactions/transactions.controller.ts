
import { Controller, Get, Param, Query, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(@Request() req, @Query('page') page: number, @Query('limit') limit: number) {
        return this.transactionsService.findAllByUser(req.user.userId, page, limit);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsService.findById(id);
    }
}
