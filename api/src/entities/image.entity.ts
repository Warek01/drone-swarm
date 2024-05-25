import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Mission, (mission) => mission.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mission_id' })
  public mission: Mission
}
