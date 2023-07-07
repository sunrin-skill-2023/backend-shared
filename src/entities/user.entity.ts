import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BoardEntity } from './board.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @OneToMany(() => BoardEntity, (board) => board.user)
  @JoinColumn()
  boards: BoardEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
