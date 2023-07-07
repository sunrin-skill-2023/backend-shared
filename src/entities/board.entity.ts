import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @JoinColumn()
  @ManyToOne(() => UserEntity, (user) => user.boards, {
    eager: true,
  })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
