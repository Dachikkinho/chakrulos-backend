import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PlayListRepository } from 'src/playlist/playlist.repository';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity, PlaylistEntity]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '7d'}
    }),
    PlaylistModule,
  ],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository, PlayListRepository],
  exports: [UsersRepository]
})
export class UsersModule {}
