import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './shared/core/env/env.service';
import { setupSwagger } from './shared/core/swagger/config/swagger.config';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const envService = app.get(EnvService);

  if (envService.get('SWAGGER_ENABLED')) {
    setupSwagger(app);
  }

  await app.listen(envService.get('PORT'), () => {
    Logger.log(`Listening on port ${envService.get('PORT')}`, 'Bootstrap');
  });
};

bootstrap();
