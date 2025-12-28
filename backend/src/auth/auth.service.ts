
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        // Ensure user exists and has password
        if (user && user.password && await bcrypt.compare(pass, user.password)) {
            const userObj = user instanceof Object && 'toObject' in user ? (user as any).toObject() : user;
            const { password, ...result } = userObj;
            return result;
        }
        return null;
    }

    async login(user: any) {
        // Ensure we have the ID. user might be doc or POJO.
        const id = user._id || user.id;
        const payload = { email: user.email, sub: id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: any) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        return this.usersService.create(user);
    }

    async validateMojoUser(email: string): Promise<any> {
        return this.usersService.findByEmail(email);
    }

    async loginWithMojo(email: string) {
        let user = await this.usersService.findByEmail(email);
        if (!user) {
            // User doesn't exist yet properly, maybe return specific flag?
            // Or create a partial user?
            // For now, return null to indicate "Signup Needed"
            return null;
        }

        const userObj = user instanceof Object && 'toObject' in user ? (user as any).toObject() : user;
        const id = userObj._id || userObj.id;
        const payload = { email: user.email, sub: id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: userObj
        };
    }
}
