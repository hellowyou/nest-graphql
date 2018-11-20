import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TABLE_NAMES } from '../../../common';
import { VideoEntity } from './video.entity';

@Entity({
  name: TABLE_NAMES.GENRES,
})
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { unique: true })
  slug: string;

  @ManyToMany(type => VideoEntity, video => video.genres)
  @JoinTable()
  videos: VideoEntity[];
}
