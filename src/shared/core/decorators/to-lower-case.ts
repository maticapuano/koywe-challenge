import { Transform } from 'class-transformer';

/**
 * A decorator that transforms a string value to lowercase.
 * This decorator is intended to be used with class properties
 * and will automatically convert any string value to its lowercase
 * equivalent during transformation.
 * @returns A transformer function that processes the value.
 */
export const ToLowerCase = () =>
  Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }

    return value;
  });
