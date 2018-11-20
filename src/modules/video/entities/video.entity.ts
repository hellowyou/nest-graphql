import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenreEntity } from './genre.entity';
import { TABLE_NAMES } from '../../../common';

@Entity({
  name: TABLE_NAMES.VIDEOS,
})
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(type => GenreEntity, genre => genre.videos)
  genres: GenreEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
