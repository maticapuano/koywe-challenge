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
  JWT_ACCESS_TOKEN_SECRET: z.string().min(10),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z
    .string()
    .regex(/^[0-9]+[smhd]$/)
    .describe('JWT access token expiration time ej: 1s, 1m, 1h, 1d'),
  DATABASE_URL: z.string(),
  QUOTE_EXPIRES_IN_MINUTES: z.coerce
    .number()
    .optional()
    .default(15)
    .describe('Quote expiration time in minutes default 15'),
});

export type EnvSchema = z.infer<typeof envSchema>;
