import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Init firebase admin SDK & run DB migration
  await app.listen(3000);
  console.log('Server listening on port 3000...');
  
}
bootstrap();
