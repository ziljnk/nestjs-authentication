import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthRequest {
    @IsEmail({}, { message: "Email is invalid" })
    @IsString({ message: "Email must be string" })
    @IsNotEmpty({ message: "Email must not be empty" })
    email: string

    @IsString({ message: "Password must be string" })
    @IsNotEmpty({ message: "Password must not be empty" })
    @MinLength(6, { message: "Password must have at least 6 characters" })
    password: string
}