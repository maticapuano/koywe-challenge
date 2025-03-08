import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const logger = new Logger('Swagger');

  logger.log('Setting up Swagger...');

  const config = new DocumentBuilder()
    .setTitle('Koywe API')
    .setDescription('Currency Exchange API (Fiat ⇄ Crypto) Challenge')
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

  httpAdapter.get('/docs/swagger.json', (_: unknown, res) =>
    res.send(document),
  );

  logger.log('Swagger documentation is available at /docs');
  logger.log('Swagger definition json is available at /docs/swagger.json');
};
