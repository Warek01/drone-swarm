import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Mission } from './mission.entity'

@Entity('drones')
export class Drone {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string

  @OneToMany(() => Mission, (mission) => mission.drone)
  public missions: Mission[]
}
