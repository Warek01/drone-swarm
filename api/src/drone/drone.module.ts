import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Drone, Image, Mission } from '@/entities'

import { DroneController } from './drone.controller'
import { DroneService } from './drone.service'

@Module({
  imports: [TypeOrmModule.forFeature([Drone, Image, Mission])],
  providers: [DroneService],
  controllers: [DroneController],
  exports: [DroneService],
})
export class DroneModule {}
