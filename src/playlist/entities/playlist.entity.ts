import { MusicEntity } from "src/music/entities/music.entity"
import { UserEntity } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToMany(() => MusicEntity, (music) => music.playLists)
    @JoinTable()
    musics: MusicEntity[]

    @ManyToOne(() => UserEntity,(user) => user.playlists)
    user: UserEntity

    @Column()
    userId: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date
}
