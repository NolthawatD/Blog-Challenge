import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ValidationExceptionFilter } from "./global/validation-error";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();
  const PORT = 8080;
  await app.listen(PORT, () => {
    console.log(`HTTP server running on http://localhost:${PORT}`);
    console.log(`WebSocket server running on ws://localhost:${PORT}/events`);
  });
}
bootstrap();