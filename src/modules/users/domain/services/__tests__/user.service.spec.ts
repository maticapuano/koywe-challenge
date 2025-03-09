import { Test, TestingModule } from '@nestjs/testing';
import { HashPasswordAdapter } from '../../adapters/hash-password.adapter';
import { User } from '../../contracts/user';
import { UserEmailTakenException } from '../../exceptions/user-email-taken';
import { UserRepository } from '../../repositories/user.repository';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;
  let hashPasswordAdapter: jest.Mocked<HashPasswordAdapter>;

  beforeEach(async () => {
    const userRepositoryMock = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const hashPasswordAdapterMock = {
      hash: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
        {
          provide: HashPasswordAdapter,
          useValue: hashPasswordAdapterMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
    hashPasswordAdapter = module.get(HashPasswordAdapter);
  });

  describe('create', () => {
    const createUserData = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashed-password';

    const createdUser: User = {
      id: 'a37df097-0058-4cf5-a827-3866baf55180',
      name: 'John Doe',
      email: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a new user successfully', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      hashPasswordAdapter.hash.mockResolvedValue(hashedPassword);
      userRepository.create.mockResolvedValue(createdUser);

      const result = await service.create(createUserData);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createUserData.email,
      );
      expect(hashPasswordAdapter.hash).toHaveBeenCalledWith(
        createUserData.password,
      );
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserData,
        password: hashedPassword,
      });
      expect(result).toEqual(createdUser);
    });

    it('should throw UserEmailTakenException when email is already registered', async () => {
      userRepository.findByEmail.mockResolvedValue(createdUser as any);

      await expect(service.create(createUserData)).rejects.toThrow(
        UserEmailTakenException,
      );

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createUserData.email,
      );
      expect(hashPasswordAdapter.hash).not.toHaveBeenCalled();
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });
});
