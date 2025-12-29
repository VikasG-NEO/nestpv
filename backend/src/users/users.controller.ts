
import { Controller, Get, Post, Body, Patch, UseGuards, Request, Param, NotFoundException } from '@nestjs/common';
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
    @Post('avatar')
    async uploadAvatar(@Request() req) {
        // File upload with Fastify requires different handling (e.g. @fastify/multipart)
        // Stubbing for now to allow build
        return { message: 'File upload temporarily disabled in Fastify mode' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('verify-documents')
    async verifyDocuments(@Request() req) {
        // In a real app, this would receive a token from DigiLocker API
        // For now, we simulate the success callback
        return this.usersService.verifyDocuments(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('id-card')
    async getIdCard(@Request() req) {
        return { status: 'generated', url: 'http://example.com/idcard.pdf' };
    }

    @Get('verify/:nestId')
    async verifyUser(@Param('nestId') nestId: string) {
        const user = await this.usersService.findByNestId(nestId);
        if (!user) {
            throw new NotFoundException('Member not found');
        }
        return user;
    }
}
