import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { writeFileSync } from 'fs';
import { AuthGuard } from 'lib/guards/auth.guard';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  const config = new DocumentBuilder()
    .setTitle('Domio')
    .setDescription('The domio property application')
    .setVersion('1.0')
    .addTag('Domio')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // 👇 Export the spec as a JSON file
  writeFileSync('./openapi.json', JSON.stringify(documentFactory(), null, 2));

  await app.listen(process.env.NEST_API_PORT);
}
bootstrap();
