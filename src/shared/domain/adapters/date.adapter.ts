export abstract class DateAdapter {
  /**
   * Returns current date and time.
   * @returns {Date} current date and time.
   */
  public abstract now(): Date;

  /**
   * Adds specified number of days to the date.
   * @param {Date} date date to which days should be added.
   * @param {number} days number of days to add.
   * @returns {Date} new date with added days.
   */
  public abstract addDays(date: Date, days: number): Date;

  /**
   * Checks if first date is before second date.
   * @param {Date} date first date.
   * @param {Date} otherDate second date.
   * @returns {boolean} true if first date is before second date, false otherwise.
   */
  public abstract isBefore(date: Date, otherDate: Date): boolean;

  /**
   * Checks if first date is after second date.
   * @param {Date} date first date.
   * @param {Date} otherDate second date.
   * @returns {boolean} true if first date is after second date, false otherwise.
   */
  public abstract isAfter(date: Date, otherDate: Date): boolean;
}
