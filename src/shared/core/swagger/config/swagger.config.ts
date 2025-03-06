import { HttpStatus, INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Response } from 'express';

export const setupSwagger = (app: INestApplication) => {
  const logger = new Logger('Swagger');

  logger.log('Setting up Swagger...');

  const config = new DocumentBuilder()
    .setTitle('Koywe API')
    .setDescription('API documentation for Koywe services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      showRequestDuration: true,
      filter: true,
    },
  });

  const httpAdapter = app.getHttpAdapter();

  httpAdapter.get(
    'docs/swagger.json',
    (_: unknown, res: Response): Response => {
      return res.status(HttpStatus.OK).send(document);
    },
  );

  logger.log('Swagger documentation is available at /docs');
  logger.log('Swagger definition json is available at /docs/swagger.json');
};
