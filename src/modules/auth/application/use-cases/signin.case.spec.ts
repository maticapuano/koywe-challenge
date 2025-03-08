import { HashPasswordAdapter } from '@/modules/users/domain/adapters/hash-password.adapter';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { Test } from '@nestjs/testing';
import { JwtAdapter } from '../../domain/adapters/jwt.adapter';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials';
import { SignInUseCase } from './signin.case';

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let hashPasswordAdapter: jest.Mocked<HashPasswordAdapter>;
  let jwtAdapter: jest.Mocked<JwtAdapter>;

  const mockUser = {
    id: 'user-id',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed-password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockInput = {
    email: 'john@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignInUseCase,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: HashPasswordAdapter,
          useValue: {
            compare: jest.fn(),
          },
        },
        {
          provide: JwtAdapter,
          useValue: {
            signAccessToken: jest.fn(),
          },
        },
      ],
    }).compile();

    signInUseCase = moduleRef.get<SignInUseCase>(SignInUseCase);
    userRepository = moduleRef.get(UserRepository);
    hashPasswordAdapter = moduleRef.get(HashPasswordAdapter);
    jwtAdapter = moduleRef.get(JwtAdapter);
  });

  it('should successfully sign in user and return access token', async () => {
    userRepository.findByEmail.mockResolvedValue(mockUser);
    hashPasswordAdapter.compare.mockResolvedValue(true);
    jwtAdapter.signAccessToken.mockResolvedValue('mock-access-token');

    const result = await signInUseCase.execute(mockInput);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockInput.email, {
      includePassword: true,
    });

    expect(hashPasswordAdapter.compare).toHaveBeenCalledWith(
      mockInput.password,
      mockUser.password,
    );

    expect(jwtAdapter.signAccessToken).toHaveBeenCalledWith(mockUser.id);

    expect(result).toEqual({
      user: mockUser,
      accessToken: 'mock-access-token',
    });
  });

  it('should throw InvalidCredentialsException when user is not found', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(signInUseCase.execute(mockInput)).rejects.toThrow(
      InvalidCredentialsException,
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockInput.email, {
      includePassword: true,
    });

    expect(hashPasswordAdapter.compare).not.toHaveBeenCalled();

    expect(jwtAdapter.signAccessToken).not.toHaveBeenCalled();
  });

  it('should throw InvalidCredentialsException when password is invalid', async () => {
    userRepository.findByEmail.mockResolvedValue(mockUser);
    hashPasswordAdapter.compare.mockResolvedValue(false);

    await expect(signInUseCase.execute(mockInput)).rejects.toThrow(
      InvalidCredentialsException,
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockInput.email, {
      includePassword: true,
    });

    expect(hashPasswordAdapter.compare).toHaveBeenCalledWith(
      mockInput.password,
      mockUser.password,
    );

    expect(jwtAdapter.signAccessToken).not.toHaveBeenCalled();
  });
});
