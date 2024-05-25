import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CreateDroneDto } from '@/dto'
import { Drone } from '@/entities'

import { DroneService } from './drone.service'

@ApiTags('Drone')
@Controller('drone')
export class DroneController {
  constructor(private readonly _droneService: DroneService) {}

  @ApiOperation({})
  @Get()
  public async getDrones(): Promise<Drone[]> {
    return this._droneService.getDrones()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createDrone(@Body() createDto: CreateDroneDto): Promise<void> {
    return this._droneService.createDrone(createDto)
  }
}
