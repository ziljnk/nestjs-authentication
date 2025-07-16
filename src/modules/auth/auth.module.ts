import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaServices } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '5m' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaServices]
})
export class AuthModule {}
