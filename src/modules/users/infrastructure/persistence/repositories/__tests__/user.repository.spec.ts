import { CreateUser } from '@/modules/users/domain/contracts/user';
import { PrismaService } from '@/shared/core/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { UserRepositoryIml } from '../user.repository';

describe('UserRepositoryIml', () => {
  let userRepository: UserRepositoryIml;
  let prismaService: PrismaService;

  const mockUser = {
    id: 'test-id',
    email: 'test@example.com',
    password: 'hashed_password',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateUser: CreateUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepositoryIml,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepositoryIml>(UserRepositoryIml);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('findById', () => {
    it('should return user without password when found', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

      const result = await userRepository.findById('test-id');

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { id: 'test-id' },
        omit: { password: true },
      });
    });

    it('should return null when user is not found', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

      const result = await userRepository.findById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return user without password by default', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

      const result = await userRepository.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        omit: { password: true },
      });
    });

    it('should return user with password when includePassword is true', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

      const result = await userRepository.findByEmail('test@example.com', {
        includePassword: true,
      });

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });

  describe('create', () => {
    it('should create user and return without password', async () => {
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await userRepository.create(mockCreateUser);

      expect(result).toEqual(mockUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...mockCreateUser,
          email: mockCreateUser.email.toLowerCase(),
        },
        omit: { password: true },
      });
    });

    it('should convert email to lowercase when creating user', async () => {
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const upperCaseEmailUser = {
        ...mockCreateUser,
        email: 'TEST@EXAMPLE.COM',
      };

      await userRepository.create(upperCaseEmailUser);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...upperCaseEmailUser,
          email: upperCaseEmailUser.email.toLowerCase(),
        },
        omit: { password: true },
      });
    });
  });
});
