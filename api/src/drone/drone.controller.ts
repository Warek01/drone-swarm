import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CommandDto, CreateDroneDto } from '@/dto'
import { Drone, Mission } from '@/entities'

import { DroneService } from './drone.service'

@ApiTags('Drone')
@Controller('drone')
export class DroneController {
  constructor(private readonly _droneService: DroneService) {}

  @Get()
  public async getDrones(): Promise<Drone[]> {
    return this._droneService.getDrones()
  }

  @Post('command')
  public async postCommand(@Body() command: CommandDto): Promise<void> {
    return this._droneService.postCommand(command)
  }

  @Get('missions')
  public async getMissions(
    @Query('droneId', ParseUUIDPipe) droneId: string,
  ): Promise<Mission[]> {
    return this._droneService.getMissions(droneId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createDrone(@Body() createDto: CreateDroneDto): Promise<void> {
    return this._droneService.createDrone(createDto)
  }

  @Delete()
  public async deleteDrone(
    @Query('droneId', ParseUUIDPipe) droneId: string,
  ): Promise<void> {
    await this._droneService.deleteDrone(droneId)
  }
}
