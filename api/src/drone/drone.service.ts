import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CommandDto, CreateDroneDto } from '@/dto'
import { Drone, Image, Mission } from '@/entities'
import { MqttService } from '@/mqtt/mqtt.service'
import { MqttTopic } from '@/mqtt/mqtt.constants'

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(Drone)
    private readonly _dronesRepo: Repository<Drone>,
    @InjectRepository(Image)
    private readonly _imagesRepo: Repository<Image>,
    @InjectRepository(Mission)
    private readonly _missionsRepo: Repository<Mission>,
    private readonly _mqttService: MqttService
  ) {}

  public async getDrones(): Promise<Drone[]> {
    return this._dronesRepo.find()
  }

  public async createDrone(createDto: CreateDroneDto): Promise<void> {
    const drone = this._dronesRepo.create({ name: createDto.name })
    await this._dronesRepo.save(drone)
  }

  public async addImage(missionId: string, data: string): Promise<void> {
    const mission = await this._missionsRepo.findOne({
      where: {
        id: missionId,
      },
      relations: {
        images: true,
      },
    })

    const image = this._imagesRepo.create({
      data: Buffer.from(data, 'base64'),
      mission,
    })

    mission.images.push(image)

    await this._missionsRepo.save(mission)
    await this._imagesRepo.save(image)
  }

  public async deleteDrone(droneId: string): Promise<void> {
    await this._dronesRepo.delete(droneId)
  }

  public async getMissions(droneId: string): Promise<Mission[]> {
    return this._missionsRepo.find({
      where: {
        drone: {
          id: droneId
        }
      }
    })
  }

  public async postCommand(command: CommandDto) {
    this._mqttService.publish(MqttTopic.COMMAND, JSON.stringify(command))
  }
}
