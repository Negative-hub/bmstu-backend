import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({credentials: true, origin: true});

    const config = new DocumentBuilder()
        .setTitle('JIRA')
        .setDescription('The jira API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger/api', app, document);

    await app.listen(process.env.APP_PORT);
}

bootstrap();
