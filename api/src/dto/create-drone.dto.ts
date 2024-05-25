import { ApiProperty } from '@nestjs/swagger'

export class CreateDroneDto {
  @ApiProperty()
  public name: string
}
