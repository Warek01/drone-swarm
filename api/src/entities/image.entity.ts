import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Mission } from './mission.entity'

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    name: 'data',
    type: 'bytea',
  })
  public data: Buffer

  @Column({ name: 'coordinates', type: 'point' })
  public coordinates: Point

  @ManyToOne(() => Mission, (mission) => mission.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mission_id' })
  public mission: Mission
}
