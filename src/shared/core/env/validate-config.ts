import { ZodError } from 'zod';
import { envSchema } from './env.schema';

export const validateConfig = (config: Record<string, unknown>) => {
  try {
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map((issue) => {
        const { message, path } = issue;
        const pathString = path.join('.');

        return `- ${pathString} =>> ${message}`;
      });

      throw new Error(`INVALID ENVIRONMENT VARIABLES\n ${errors}`);
    }
  }
};
