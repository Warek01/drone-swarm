import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fs from 'fs'
import { MqttClient, PacketCallback, connect } from 'mqtt'

export type MqttSubscribeCallback = (data: Buffer) => void

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private _client: MqttClient
  private readonly _logger = new Logger(MqttService.name)

  constructor(private readonly _configService: ConfigService) {}

  public publish(
    topic: string,
    message: string | Buffer,
    callback?: PacketCallback,
  ): void {
    this._client.publish(topic, message, callback)
  }

  public subscribe(topic: string, callback: MqttSubscribeCallback): void {
    this._client
      .subscribe(topic, (err) => {
        if (err) this._logger.log('subscribe error', err)
      })
      .on('message', (_topic, data) => {
        if (_topic === topic) callback(data)
      })
  }

  public onModuleInit(): void {
    this._client = connect({
      port: parseInt(this._configService.get('MQTT_PORT')),
      host: this._configService.get('MQTT_HOST'),
      clientId: this._configService.get('MQTT_CLIENT_ID'),
      protocol: this._configService.get('MQTT_PROTOCOL'),
      password: this._configService.get('MQTT_PASSWORD'),
      username: this._configService.get('MQTT_USER'),
      cert: this._configService.get('MQTT_CERT_PATH')
        ? fs.readFileSync(this._configService.get('MQTT_CERT_PATH'))
        : undefined,
    })

    this._client
      .on('connect', () => {
        this._logger.log('mqtt connected')
      })
      .on('error', (error) => {
        this._logger.log('mqtt error', error)
      })
  }

  public onModuleDestroy(): void {
    this._client.end()
  }
}
