import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaServices extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super();
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}