
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ApiResponse } from 'src/common/bases/api-response';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: unknown, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
        return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        const formatErrors = this.formatErrors(errors)

        if (errors.length > 0) {
            const response = ApiResponse.error(formatErrors, "Failed to validate", HttpStatus.BAD_REQUEST)
            throw new HttpException(response, HttpStatus.BAD_REQUEST)
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formatErrors(errors: ValidationError[]) {
        const result = {}
        errors.forEach(error => {
            if (error.constraints) {
                result[error.property] = Object.values(error.constraints)
            }
        })

        return result
    }
}
