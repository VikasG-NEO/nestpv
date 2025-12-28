
import { Controller, Get, Post, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req) {
        return this.usersService.findById(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('profile')
    async updateProfile(@Request() req, @Body() updateUserDto: any) {
        return this.usersService.update(req.user.userId, updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('jwt'))
    @Post('avatar')
    async uploadAvatar(@Request() req) {
        // File upload with Fastify requires different handling (e.g. @fastify/multipart)
        // Stubbing for now to allow build
        return { message: 'File upload temporarily disabled in Fastify mode' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('id-card')
    async getIdCard(@Request() req) {
        return { status: 'generated', url: 'http://example.com/idcard.pdf' };
    }
}
