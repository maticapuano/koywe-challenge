import { addDays, addMinutes } from 'date-fns';
import { DateFnsDateAdapter } from '../date-fns';

describe('DateFnsDateAdapter', () => {
  let dateAdapter: DateFnsDateAdapter;
  let baseDate: Date;

  beforeEach(() => {
    dateAdapter = new DateFnsDateAdapter();
    baseDate = new Date('2025-01-01T12:00:00Z');
  });

  describe('now()', () => {
    it('should return current date', () => {
      const before = new Date();
      const result = dateAdapter.now();
      const after = new Date();

      expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(result.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe('addDays()', () => {
    it('should add positive days correctly', () => {
      const daysToAdd = 5;

      const expected = addDays(baseDate, daysToAdd);
      const result = dateAdapter.addDays(baseDate, daysToAdd);

      expect(result).toEqual(expected);
    });

    it('should add negative days correctly', () => {
      const daysToAdd = -3;

      const expected = addDays(baseDate, daysToAdd);
      const result = dateAdapter.addDays(baseDate, daysToAdd);

      expect(result).toEqual(expected);
    });

    it('should handle zero days', () => {
      const result = dateAdapter.addDays(baseDate, 0);

      expect(result).toEqual(baseDate);
    });
  });

  describe('addMinutes()', () => {
    it('should add positive minutes correctly', () => {
      const minutesToAdd = 120;

      const expected = addMinutes(baseDate, minutesToAdd);
      const result = dateAdapter.addMinutes(baseDate, minutesToAdd);

      expect(result).toEqual(expected);
    });

    it('should add negative minutes correctly', () => {
      const minutesToAdd = -30;

      const expected = addMinutes(baseDate, minutesToAdd);
      const result = dateAdapter.addMinutes(baseDate, minutesToAdd);

      expect(result).toEqual(expected);
    });

    it('should handle zero minutes', () => {
      const result = dateAdapter.addMinutes(baseDate, 0);

      expect(result).toEqual(baseDate);
    });
  });

  describe('isAfter()', () => {
    it('should return true when first date is after second date', () => {
      const laterDate = new Date('2025-01-02T12:00:00Z');

      expect(dateAdapter.isAfter(laterDate, baseDate)).toBe(true);
    });

    it('should return false when first date is before second date', () => {
      const earlierDate = new Date('2024-12-31T12:00:00Z');

      expect(dateAdapter.isAfter(earlierDate, baseDate)).toBe(false);
    });

    it('should return false when dates are equal', () => {
      const sameDate = new Date(baseDate);

      expect(dateAdapter.isAfter(sameDate, baseDate)).toBe(false);
    });
  });

  describe('isBefore()', () => {
    it('should return true when first date is before second date', () => {
      const earlierDate = new Date('2024-12-31T12:00:00Z');

      expect(dateAdapter.isBefore(earlierDate, baseDate)).toBe(true);
    });

    it('should return false when first date is after second date', () => {
      const laterDate = new Date('2025-01-02T12:00:00Z');

      expect(dateAdapter.isBefore(laterDate, baseDate)).toBe(false);
    });

    it('should return false when dates are equal', () => {
      const sameDate = new Date(baseDate);

      expect(dateAdapter.isBefore(sameDate, baseDate)).toBe(false);
    });
  });
});
