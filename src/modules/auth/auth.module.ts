import { EnvModule } from '@/shared/core/env/env.module';
import { EnvService } from '@/shared/core/env/env.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { CurrentUserUseCase } from './application/use-cases/current.case';
import { SignInUseCase } from './application/use-cases/signin.case';
import { SignUpUseCase } from './application/use-cases/signup.case';
import { JwtAdapter } from './domain/adapters/jwt.adapter';
import { JwtAdapterIml } from './infrastructure/adapters/jwt-adapter/jwt';
import { AuthController } from './infrastructure/http/api/v1/controllers/auth.controller';

@Module({
  imports: [
    EnvModule,
    UsersModule,
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
      useClass: JwtAdapterIml,
    },
    SignUpUseCase,
    SignInUseCase,
    CurrentUserUseCase,
  ],
  controllers: [AuthController],
  exports: [JwtAdapter],
})
export class AuthModule {}
