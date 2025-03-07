import { AuthModule } from '@/modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EnvModule } from './core/env/env.module';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';

@Module({
  imports: [EnvModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class SharedModule {}
