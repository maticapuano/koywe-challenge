import { Module } from '@nestjs/common';
import { EnvModule } from './core/env/env.module';

@Module({
  imports: [EnvModule],
})
export class SharedModule {}
