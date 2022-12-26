import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as dotenv from 'dotenv'
import {join} from "path";

dotenv.config()

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({credentials: true, origin: true});

    app.useStaticAssets(join(__dirname, '..', 'assets'))
    app.setBaseViewsDir(join(__dirname, '..', 'views'))
    app.setViewEngine('pug')

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
