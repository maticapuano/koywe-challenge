import { z } from 'zod';
import { booleanCoerce } from '../validators/zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().optional().default(3000),
  SWAGGER_ENABLED: booleanCoerce.optional().default('true'),
});

export type EnvSchema = z.infer<typeof envSchema>;
