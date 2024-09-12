import { MaxLength, MinLength } from "class-validator";
import { RoleEnum } from "src/auth/roles/roles.enum";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { S3service } from "src/s3service/entities/s3service.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    @MinLength(8)
    @MaxLength(9)
    password: string

    @Column({default: RoleEnum.user, type: 'enum', enum: RoleEnum})
    role: RoleEnum;

    @OneToMany(() => PlaylistEntity,(playlist) => playlist.user)
    playlists: PlaylistEntity[]

    @OneToMany(() => S3service, s3service => s3service.user)
    uploads: S3service[]

    @Column({default: false})
    blocked: boolean;
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date
}
