import { AuthModule } from '@/modules/auth/auth.module';
import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EnvModule } from './core/env/env.module';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { PrismaModule } from './core/prisma/prisma.module';

@Global()
@Module({
  imports: [EnvModule, AuthModule, PrismaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [EnvModule, PrismaModule],
})
export class SharedModule {}
