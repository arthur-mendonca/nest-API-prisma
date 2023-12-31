/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { UnauthorizedInterceptor } from "./common/errors/interceptors/unauthorized.interceptor";
import { NotFoundInterceptor } from "./common/errors/interceptors/notfound.interceptor";
import { ConflictInterceptor } from "./common/errors/interceptors/conflict.interceptor";
import { DataBaseInterceptor } from "./common/errors/interceptors/database.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Nest Blog")
    .setDescription("A blog made with Nest")
    .setVersion("1.0")
    .addTag("")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new DataBaseInterceptor());

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
