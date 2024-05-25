import { Logger, Module, OnModuleInit } from '@nestjs/common'

import { DroneModule } from '@/drone/drone.module'
import { DroneService } from '@/drone/drone.service'
import { ImageMessage } from '@/mqtt/mqtt.definitions'

import { MqttTopic } from './mqtt.constants'
import { MqttService } from './mqtt.service'

@Module({
  imports: [DroneModule],
  controllers: [],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule implements OnModuleInit {
  private readonly _logger = new Logger(MqttModule.name)

  constructor(
    private readonly _mqttService: MqttService,
    private readonly _droneService: DroneService,
  ) {}

  public onModuleInit(): void {
    this._mqttService.subscribe(MqttTopic.IMAGE, async (data) => {
      const message: ImageMessage = JSON.parse(data.toString('utf-8'))
      await this._droneService.addImage(message.missionId, message.data)
      this._logger.log('Received image for mission ' + message.missionId)
    })
  }
}
