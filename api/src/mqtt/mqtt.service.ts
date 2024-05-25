import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { MqttClient, connect, PacketCallback } from 'mqtt'
import { ConfigService } from '@nestjs/config'
import fs from 'fs'
import path from 'path'

export type MqttSubscribeCallback = (data: Buffer) => void

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private _client: MqttClient

  constructor(
    private readonly _configService: ConfigService,
  ) {
  }

  public publish(
    topic: string,
    message: string | Buffer,
    callback?: PacketCallback,
  ): void {
    this._client.publish(topic, message, callback)
  }

  public subscribe(topic: string, callback: MqttSubscribeCallback): void {
    this._client
      .subscribe(topic, err => {
        if (err) console.log('subscribe error', err)
      })
      .on('message', (_topic, data) => {
        if (_topic === topic)
          callback(data)
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
      cert: fs.readFileSync(this._configService.get('MQTT_CERT_PATH')),
    })

    this._client
      .on('connect', () => {
        console.log('mqtt connected')
      })
      .on('error', (error) => {
        console.log('mqtt error', error)
      })
  }

  public onModuleDestroy(): void {
    this._client.end()
  }
}
