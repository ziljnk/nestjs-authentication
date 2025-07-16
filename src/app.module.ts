import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaServices } from './modules/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheableMemory } from 'cacheable';
import { Keyv } from "keyv"
import { createKeyv } from '@keyv/redis';

@Module({
    imports: [
        AuthModule,
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: () => {
                return {
                    stores: [
                        new Keyv({
                            store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
                            namespace: "nestjs-memory-cache"
                        }),
                        createKeyv("redis://localhost:6379/1", {
                            namespace: "nestjs_newbie"
                        })
                    ]
                }
            }
        })
    ],
    controllers: [AppController],
    providers: [AppService, PrismaServices],
})
export class AppModule {}
