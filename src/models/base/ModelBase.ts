import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm'
  
  import { StatusEnum } from '../../domain/enums/baseEnums/_index'
  
  export abstract class ModelBase {
    @PrimaryGeneratedColumn('uuid')
    id: string
  
    @Column({ type: 'smallint', default: StatusEnum.ATIVO })
    status: StatusEnum
  
    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date
  
    @UpdateDateColumn({
      type: 'timestamptz',
      name: 'updated_at',
      default: null,
      nullable: true,
    })
    updatedAt: Date
  }
  