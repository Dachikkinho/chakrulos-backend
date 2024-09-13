import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from './music/musics.module';
import { AuthorsModule } from './authors/authors.module';
import { AlbumModule } from './albums/albums.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { S3serviceModule } from './s3service/s3service.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { FavoriteEntity } from './favorites/entities/favorite.entity';
import { FavoritesModule } from './favorites/favorites.module';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/'
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      global: true,
      signOptions: {expiresIn: '7d'}
    }),
    MusicModule,
    AuthorsModule,
    AlbumModule,
    SearchModule,
    UsersModule,
    PlaylistModule,
    AuthModule,
    S3serviceModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})

export class AppModule {}
