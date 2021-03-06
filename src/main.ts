import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.warn(`App listening on http://localhost:${PORT}`);
  });
}
bootstrap();
