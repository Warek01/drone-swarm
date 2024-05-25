import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Drone } from './drone.entity'
import { Image } from './image.entity'

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string

  @Column({ name: 'date', type: 'date' })
  public date: Date

  @OneToMany(() => Image, (image) => image.mission)
  public images: Image[]

  @ManyToOne(() => Drone, (drone) => drone.missions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drone_id' })
  public drone: Drone
}
