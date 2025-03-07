import {
  CreateUser,
  User,
  UserWithPassword,
} from '@/modules/users/domain/contracts/user';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { PrismaService } from '@/shared/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryIml implements UserRepository {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async findById(id: string): Promise<User | null> {
    const user = await this._prismaService.user.findFirst({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });

    return user ?? null;
  }

  public findByEmail(email: string): Promise<User>;
  public findByEmail(
    email: string,
    options: { includePassword: true },
  ): Promise<UserWithPassword>;
  public findByEmail(
    email: string,
    options?: { includePassword: boolean },
  ): Promise<User | UserWithPassword> {
    const user = this._prismaService.user.findFirst({
      where: {
        email,
      },
      ...(!options?.includePassword && {
        omit: {
          password: true,
        },
      }),
    });

    return user;
  }

  public async create(user: CreateUser): Promise<User> {
    const createdUser = await this._prismaService.user.create({
      data: {
        ...user,
        email: user.email.toLowerCase(),
      },
      omit: {
        password: true,
      },
    });

    return createdUser;
  }
}
