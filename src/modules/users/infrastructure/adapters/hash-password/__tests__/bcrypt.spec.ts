import { InvalidArgumentException } from '@/shared/domain/exceptions/invalid-argument';
import { BcryptHashPasswordAdapter } from '../bcrypt';

describe('BcryptHashPasswordAdapter', () => {
  let adapter: BcryptHashPasswordAdapter;

  beforeEach(() => {
    adapter = new BcryptHashPasswordAdapter();
  });

  describe('hash', () => {
    it('should hash a password successfully', async () => {
      const password = 'validPassword123';
      const hashedPassword = await adapter.hash(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(typeof hashedPassword).toBe('string');
    });

    it('should throw InvalidArgumentException when password exceeds max length', async () => {
      const longPassword = 'a'.repeat(73); // Max length is 72

      await expect(adapter.hash(longPassword)).rejects.toThrow(
        InvalidArgumentException,
      );
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'samePassword123';

      const hash1 = await adapter.hash(password);
      const hash2 = await adapter.hash(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('compare', () => {
    it('should return true for matching password and hash', async () => {
      const password = 'correctPassword123';

      const hash = await adapter.hash(password);
      const result = await adapter.compare(password, hash);

      expect(result).toBe(true);
    });

    it('should return false for non-matching password and hash', async () => {
      const password = 'correctPassword123';
      const wrongPassword = 'wrongPassword123';
      const hash = await adapter.hash(password);

      const result = await adapter.compare(wrongPassword, hash);

      expect(result).toBe(false);
    });

    it('should handle empty password comparison', async () => {
      const password = 'somePassword123';

      const hash = await adapter.hash(password);

      const result = await adapter.compare('', hash);

      expect(result).toBe(false);
    });
  });
});
