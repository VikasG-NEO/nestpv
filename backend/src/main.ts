import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 50 * 1024 * 1024 }) // 50MB limit
  );
  // Enable CORS with explicit options for frontend communication
  app.enableCors({
    origin: true, // Allow any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Security Headers
  // @ts-ignore
  await app.register(require('@fastify/helmet'), {
    contentSecurityPolicy: false, // CSP can break things if not careful, disable for now or configure
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend is running on: http://localhost:${port}`);
  // Env loaded...
}
bootstrap();
