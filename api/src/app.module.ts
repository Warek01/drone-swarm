import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppEnv } from './definitions'
import { Image } from './entities'
import { MqttModule } from './mqtt/mqtt.module'
import { DroneModule } from '@/drone/drone.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppEnv>) => ({
        type: 'postgres',
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
    DroneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
