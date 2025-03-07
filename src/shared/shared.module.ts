import { AuthModule } from '@/modules/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EnvModule } from './core/env/env.module';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { PrismaModule } from './core/prisma/prisma.module';
import { DateAdapter } from './domain/adapters/date.adapter';
import { DateFnsDateAdapter } from './infrastructure/adapters/date-adapter/date-fns';

@Global()
@Module({
  imports: [
    EnvModule,
    AuthModule,
    PrismaModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        headers: {
          'User-Agent': 'koywe',
        },
      }),
      global: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: DateAdapter,
      useClass: DateFnsDateAdapter,
    },
  ],
  exports: [EnvModule, PrismaModule, HttpModule, DateAdapter],
})
export class SharedModule {}
