import { AlbumEntity } from 'src/albums/entities/album.entity';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  authorId: number;

  @Column()
  albumId: number

  @Column()
  url: string;

  @Column()
  image: string;

  @ManyToOne(() => AuthorEntity, (autor) => autor.musics)
  author: AuthorEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.musics)
  album: AlbumEntity;

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.musics)
  playLists: PlaylistEntity[];

  @OneToMany(() => FavoriteEntity,(favorite) => favorite.music)
  favorites: FavoriteEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  delatedAt: Date;
}
