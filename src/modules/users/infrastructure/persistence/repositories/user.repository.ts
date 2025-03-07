import { CreateUser, User } from '@/modules/users/domain/contracts/user';
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
    });

    return user ?? null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this._prismaService.user.findFirst({
      where: {
        email,
      },
    });

    return user ?? null;
  }

  public async create(user: CreateUser): Promise<User> {
    const createdUser = await this._prismaService.user.create({
      data: {
        ...user,
        email: user.email.toLowerCase(),
      },
    });

    return createdUser;
  }
}
