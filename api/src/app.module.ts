import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MqttModule } from './mqtt/mqtt.module'
import { AppEnv } from './definitions'
import { Image } from './entities'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppEnv>) => ({
        type: 'mysql',
        port: parseInt(config.get('DB_PORT')),
        host: config.get('DB_HOST'),
        synchronize: true,
        database: config.get('DB_NAME'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        schema: config.get('DB_SCHEMA'),
        entities: ['**/*.entity.js'],
      }),
    }),
    TypeOrmModule.forFeature([Image]),
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
