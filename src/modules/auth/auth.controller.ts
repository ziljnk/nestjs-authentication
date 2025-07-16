import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthRequest } from './auth.request.dto';
import { AuthService } from './auth.service';
import { ApiResponse, TApiResponse } from 'src/common/bases/api-response';
import { ILoginResponse } from './auth.interface';

@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body(new ValidationPipe()) request: AuthRequest): Promise<TApiResponse<ILoginResponse>> {
        try {
            const response = await this.authService.authenticate(request)

            return ApiResponse.ok(response, "Login successfully", HttpStatus.OK)
        } catch (errors) {
            return ApiResponse.error(errors, "There is something wrong", HttpStatus.BAD_REQUEST)
        }
    }
}
