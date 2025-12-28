
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: any) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: any) {
        return this.authService.register(createUserDto);
    }

    @Post('verify-phone')
    async verifyPhone(@Body() body: { phone: string; otp: string }) {
        // Implement OTP verification logic here
        return { message: 'Phone verified successfully' };
    }

    @Post('refresh')
    async refresh(@Body() body: { refreshToken: string }) {
        // Implement refresh token logic
        return { message: 'Token refreshed' };
    }
}
