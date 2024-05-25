import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    name: 'data',
    type: 'blob',
    nullable: true,
  })
  public binaryData: Buffer
}
