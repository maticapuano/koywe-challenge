import { UserService } from '@/modules/users/domain/services/user.service';
import { Test } from '@nestjs/testing';
import { JwtAdapter } from '../../../domain/adapters/jwt.adapter';
import { SignUpUseCase } from '../signup.case';

describe('SignUpUseCase', () => {
  let signUpUseCase: SignUpUseCase;
  let userService: jest.Mocked<UserService>;
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
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
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

    signUpUseCase = moduleRef.get<SignUpUseCase>(SignUpUseCase);
    userService = moduleRef.get(UserService);
    jwtAdapter = moduleRef.get(JwtAdapter);
  });

  it('should successfully create user and return access token', async () => {
    userService.create.mockResolvedValue(mockUser);
    jwtAdapter.signAccessToken.mockResolvedValue('mock-access-token');

    const result = await signUpUseCase.execute(mockInput);

    expect(userService.create).toHaveBeenCalledWith(mockInput);
    expect(jwtAdapter.signAccessToken).toHaveBeenCalledWith(mockUser.id);

    expect(result).toEqual({
      user: mockUser,
      accessToken: 'mock-access-token',
    });
  });

  it('should propagate UserEmailTakenException from UserService', async () => {
    const error = new Error('Email taken');

    userService.create.mockRejectedValue(error);

    await expect(signUpUseCase.execute(mockInput)).rejects.toThrow(error);

    expect(userService.create).toHaveBeenCalledWith(mockInput);
    expect(jwtAdapter.signAccessToken).not.toHaveBeenCalled();
  });
});
