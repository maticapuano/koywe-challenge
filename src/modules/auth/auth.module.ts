import { EnvModule } from '@/shared/core/env/env.module';
import { EnvService } from '@/shared/core/env/env.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdapter } from './domain/adapters/jwt.adapter';
import { JwtAdapterIml } from './infrastructure/adapters/jwt-adapter/jwt';

@Module({
  imports: [
    EnvModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        global: true,
        secret: envService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: envService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: JwtAdapter,
      useValue: JwtAdapterIml,
    },
  ],
  exports: [JwtAdapter],
})
export class AuthModule {}
