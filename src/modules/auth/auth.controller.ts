import { Body, Controller, Get, Post } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthRequest } from './auth.request.dto';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    login(@Body(new ValidationPipe()) request: AuthRequest): unknown {
        try {
            return this.authService.authenticate(request)
        } catch (errors) {
            console.log('Errors', errors)
        }
    }
}
