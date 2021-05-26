import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap () {
    const app = await NestFactory.create(AppModule, { cors: true })

    const options = new DocumentBuilder()
        .setTitle('Deadlocks RESTful Api')
        .setDescription('The deadlocks API description')
        .setVersion('1.2')
        .addTag('deadlocks')
        .build()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('api', app, document)

    await app.listen(3005)
}
bootstrap()
