import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {YtDownloaderWrapper} from "./yt-downloader-wrapper";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/download',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, YtDownloaderWrapper],
})
export class AppModule {}
