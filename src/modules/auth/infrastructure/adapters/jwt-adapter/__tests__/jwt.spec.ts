import { InvalidAccessTokenException } from '@/modules/auth/domain/exceptions/invalid-access-token';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { JwtAdapterIml } from '../jwt';

describe('JwtAdapterIml', () => {
  let jwtAdapterIml: JwtAdapterIml;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtAdapterIml,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtAdapterIml = moduleRef.get<JwtAdapterIml>(JwtAdapterIml);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('signAccessToken', () => {
    it('should sign access token with subject', async () => {
      const subject = 'test-subject';
      const expectedToken = 'signed-token';

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(expectedToken);

      const result = await jwtAdapterIml.signAccessToken(subject);

      expect(jwtService.signAsync).toHaveBeenCalledWith({}, { subject });
      expect(result).toBe(expectedToken);
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify access token and return subject', async () => {
      const token = 'valid-token';
      const expectedSubject = 'test-subject';

      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockResolvedValue({ sub: expectedSubject });

      const result = await jwtAdapterIml.verifyAccessToken(token);

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
      expect(result).toBe(expectedSubject);
    });

    it('should throw InvalidAccessTokenException when token is invalid', async () => {
      const token = 'invalid-token';

      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockRejectedValue(new Error('Invalid token'));

      await expect(jwtAdapterIml.verifyAccessToken(token)).rejects.toThrow(
        InvalidAccessTokenException,
      );

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
    });
  });
});
