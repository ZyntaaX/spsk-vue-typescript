import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { config } from 'dotenv';
// import path from 'path';

// config(/* { path: path.resolve(__dirname, '../.env') } */);
// console.log(process.env.DATABASE_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    abortOnError: false,
  });
  // Init firebase admin SDK & run DB migration
  await app.listen(process.env.SERVER_PORT ?? 3000);
  console.log(`Server listening on port ${process.env.SERVER_PORT ?? 3000}...`);
}
bootstrap();
