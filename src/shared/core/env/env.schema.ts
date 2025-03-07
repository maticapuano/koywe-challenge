import { Environment } from '@/shared/domain/enums/environment';
import { z } from 'zod';
import { booleanCoerce } from '../validators/zod';

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
  DEBUG: booleanCoerce
    .optional()
    .default('false')
    .describe('Enable debug mode show stack trace'),
  PORT: z.coerce.number().optional().default(3000),
  SWAGGER_ENABLED: booleanCoerce.optional().default('true'),
  CORS_ORIGIN: z.string().default('*'),
});

export type EnvSchema = z.infer<typeof envSchema>;
