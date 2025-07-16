import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthRequest } from './auth.request.dto';
import { PrismaServices } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserWithoutPassword } from '../user/user.interface';
import { IJwtPayload, ILoginResponse } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaServices,
        private readonly jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async authenticate(request: AuthRequest): Promise<ILoginResponse> {
        
    }

    // async authenticate(request: AuthRequest): Promise<ILoginResponse> {
    //     const user = await this.validateUser(request.email, request.password)
    //     if (!user) {
    //         throw new UnauthorizedException("Email or password is incorrect.")
    //     }

    //     const payload = { sub: user.id.toString() }

    //     const accessToken = await this.jwtService.signAsync(payload)
    //     const refreshToken = randomBytes(32).toString("hex")
    //     const crsfToken = randomBytes(32).toString("hex")


    //     return this.authResponse(accessToken, crsfToken)
    // }

    // authResponse(accessToken: string, crfsToken: string): ILoginResponse {
    //     const decoded = this.jwtService.decode<IJwtPayload>(accessToken)

    //     const expiresAt = decoded.exp - Math.floor(Date.now() / 1000)

    //     return {
    //         accessToken: accessToken,
    //         expiresAt: expiresAt,
    //         tokenType: "Bearer",
    //         crfsToken: crfsToken
    //     }
    // }

    async validateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        })

        if (!user) {
            return null
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return null;
        }
        const { password: _, ...result } = user;
        return result;
    }
}
