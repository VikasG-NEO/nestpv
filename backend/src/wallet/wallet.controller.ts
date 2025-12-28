
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getBalance(@Request() req) {
        return this.walletService.getBalance(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    addMoney(@Request() req, @Body() body: { amount: number; paymentMethod: string }) {
        return this.walletService.addMoney(req.user.userId, body.amount);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('withdraw')
    withdraw(@Request() req, @Body() body: { amount: number; bankAccountId: string }) {
        return this.walletService.withdraw(req.user.userId, body.amount);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('transfer')
    transfer(@Request() req, @Body() body: { recipientId: string; amount: number }) {
        return this.walletService.transfer(req.user.userId, body.recipientId, body.amount);
    }
}
