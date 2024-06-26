import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './global/validation-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,  // Strip properties that do not have decorators
    forbidNonWhitelisted: true,  // Throw an error if non-whitelisted properties are found
    transformOptions: {
      enableImplicitConversion: true, // Automatically convert types based on decorators
    },
  }));
	app.useGlobalFilters(new ValidationExceptionFilter());
  const PORT = parseInt(process.env.PORT, 10) ?? 8081;
  await app.listen(PORT, () => {
    console.log('Server running on port : ', PORT);
  });
}
bootstrap();
