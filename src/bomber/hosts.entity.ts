import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany, JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Tree,
  TreeChildren,
  TreeParent,
  DeleteDateColumn,
  OneToMany,
  BaseEntity
} from 'typeorm';

@Entity({ name: 'hosts' })
export class Hosts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  url: string;

  @Column({ default: false, nullable: true })
  validate: boolean;

  @Column({ default: {}})
  data: string;

  @Column({ default: '' })
  plus: string;

  @Column({ nullable: true })
  paramName: string;

  @Column()
  method: string;

  @Column({ nullable: true })
  сontentType: string;

  @Column({ nullable: true })
  accept: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}