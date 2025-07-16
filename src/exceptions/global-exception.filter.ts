import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "src/common/bases/api-response";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        let message: string = "Network Error"

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            const exceptionResponse = exception.getResponse()
            if(typeof exceptionResponse === "string") {
                message = exceptionResponse
            } else if (exceptionResponse && typeof exceptionResponse === "object") {
                const responseObject = exceptionResponse as { message?: string }

                message = responseObject.message || "Network Error"
            }

            switch(status) {
                case HttpStatus.BAD_REQUEST:
                    message = message || "Invalid request data"
                    break;
                case HttpStatus.UNAUTHORIZED:
                    message = message || "You need to log in to perform this action"
                    break;
                case HttpStatus.INTERNAL_SERVER_ERROR:
                    message = message || "Internal server error"
                    break;
                    
                default:
                    break;
            }
        } else {
            message = "System error"
        }

        const apiResponse = ApiResponse.message(message, status)
        response.status(status).json(apiResponse)
    }
}