import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { AppEnv } from './definitions'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService<AppEnv>)

  const config = new DocumentBuilder()
    .setTitle('Drone swarm API')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.startAllMicroservices()
  await app.listen(parseInt(configService.get('PORT')))
}

bootstrap()
