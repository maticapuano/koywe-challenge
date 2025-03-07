import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { EnvService } from './shared/core/env/env.service';
import { HttpExceptionFilter } from './shared/core/filters/http-exception.filter';
import { setupSwagger } from './shared/core/swagger/config/swagger.config';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  const envService = app.get(EnvService);

  app.enableShutdownHooks();
  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: envService.get('CORS_ORIGIN'),
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  if (envService.get('SWAGGER_ENABLED')) {
    setupSwagger(app);
  }

  app.useGlobalFilters(new HttpExceptionFilter(envService));

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(envService.get('PORT'), () => {
    Logger.log(`Listening on port ${envService.get('PORT')}`, 'Bootstrap');
  });
};

bootstrap();
