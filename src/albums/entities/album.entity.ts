import { ModulesContainer } from "@nestjs/core";
import { IsDate } from "class-validator";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { MusicEntity } from "src/music/entities/music.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    artistName: string;

    @Column({type: "varchar"})
    releaseDate: string;

    @Column()
    authorId: number;

    @Column()
    image: string;

    @ManyToOne(() => AuthorEntity, (author) => author.album)
    @JoinColumn()
    author: AuthorEntity;

    @OneToMany(() => MusicEntity, (musics) => musics.album)
    musics: MusicEntity[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date
}
