import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setViewEngine({
    engine: {
      pug: require('pug'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  await app.listen(3000);
}
bootstrap();
