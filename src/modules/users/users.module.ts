import { Module } from '@nestjs/common';
import { HashPasswordAdapter } from './domain/adapters/hash-password.adapter';
import { UserRepository } from './domain/repositories/user.repository';
import { UserService } from './domain/services/user.service';
import { BcryptHashPasswordAdapter } from './infrastructure/adapters/hash-password/bycript';
import { UserRepositoryIml } from './infrastructure/persistence/repositories/user.repository';

@Module({
  providers: [
    {
      provide: HashPasswordAdapter,
      useClass: BcryptHashPasswordAdapter,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryIml,
    },
    UserService,
  ],
  exports: [HashPasswordAdapter, UserRepository, UserService],
})
export class UsersModule {
  public constructor(private readonly _userService: UserService) {}

  public async onModuleInit() {
    await this._userService.create({
      name: 'Juan',
      email: 'juan@PEPE.com',
      password: '123456',
    });
  }
}
