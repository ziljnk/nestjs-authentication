export interface ILoginResponse {
    accessToken: string, 
    expiresAt: number,
    tokenType: string,
    crfsToken: string
}

export interface IJwtPayload {
    sub: string,
    exp: number, 
    iat: number
}