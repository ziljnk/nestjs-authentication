import { Injectable } from '@nestjs/common';
import { AuthRequest } from './auth.request.dto';

@Injectable()
export class AuthService {
    authenticate(request: AuthRequest) {
        return request
    }

    async validateUser(email: string, password: string): Promise<any> {

        return null;
    }
}
