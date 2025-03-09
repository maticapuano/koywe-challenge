import { User } from '@/modules/users/domain/contracts/user';
import { UserNotFoundException } from '@/modules/users/domain/exceptions/user-not-found';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { Test } from '@nestjs/testing';
import { CurrentUserUseCase } from '../current.case';

describe('CurrentUserUseCase', () => {
  let currentUserUseCase: CurrentUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CurrentUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    currentUserUseCase = moduleRef.get<CurrentUserUseCase>(CurrentUserUseCase);
    userRepository = moduleRef.get(UserRepository);
  });

  describe('execute', () => {
    it('should return user when found', async () => {
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await currentUserUseCase.execute({
        userId: 'test-user-id',
      });

      expect(result).toEqual(mockUser);
      expect(userRepository.findById).toHaveBeenCalledWith('test-user-id');
    });

    it('should throw UserNotFoundException when user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(
        currentUserUseCase.execute({ userId: 'non-existent-id' }),
      ).rejects.toThrow(UserNotFoundException);

      expect(userRepository.findById).toHaveBeenCalledWith('non-existent-id');
    });
  });
});
