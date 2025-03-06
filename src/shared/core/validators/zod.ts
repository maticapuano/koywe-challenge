import { z } from 'zod';

export const booleanCoerce = z
  .string()
  .toLowerCase()
  .transform((value) => value === 'true')
  .pipe(z.boolean());
