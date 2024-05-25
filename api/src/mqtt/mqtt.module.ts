import { Module, OnModuleInit } from '@nestjs/common'
import { MqttService } from './mqtt.service'

@Module({
  imports: [],
  controllers: [],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule implements OnModuleInit {
  constructor(private readonly _mqttService: MqttService) {
  }

  public onModuleInit(): void {
    this._mqttService.subscribe('test', (data) => {
      console.log(data.toString('utf-8'))
    })
    this._mqttService.subscribe('test2', (data) => {
      console.log(data.toString('utf-8'))
    })
  }
}
