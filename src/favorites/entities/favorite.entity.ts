import { MusicEntity } from "src/music/entities/music.entity"
import { UserEntity } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class FavoriteEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    userId: number

    @Column()
    musicId: number

    @ManyToOne(() => UserEntity, (user) => user.favorites)
    user: UserEntity

    @ManyToOne(() => MusicEntity, (music) => music.favorites)
    music: MusicEntity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date

}
