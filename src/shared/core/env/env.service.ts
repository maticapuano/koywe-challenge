import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from './env.schema';

@Injectable()
export class EnvService {
  public constructor(
    private readonly _configService: ConfigService<EnvSchema>,
  ) {}

  /**
   * Retrieve the value of an environment variable.
   * @param key The key of the environment variable to retrieve.
   * @returns The value of the environment variable, or undefined if the
   * variable is not set.
   */
  public get<T extends keyof EnvSchema>(key: T): EnvSchema[T] {
    return this._configService.get(key, { infer: true });
  }
}
