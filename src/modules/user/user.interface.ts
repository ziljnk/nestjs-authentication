export interface User {
    id: bigint;
    email: string;
    password: string;
    name: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserWithoutPassword = Omit<User, 'password'>;