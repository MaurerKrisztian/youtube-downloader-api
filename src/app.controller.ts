import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';
import {YtDownloaderWrapper} from "./yt-downloader-wrapper";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly ytDownloaderWrapper:YtDownloaderWrapper) {}

  @Post()
  async crop(@Body() body: { videoUrl: string; clipSearch: string, type: 'sentence' | 'fragment'}) {
    const id = uuidv4();

    console.log('download video ' + body.videoUrl);
    const logs = await this.appService.runInCommandLine(
      `yt-dlp "${body.videoUrl}" --write-auto-sub --sub-lang en -f 22 -o static/${id}/${id}.mp4`,
    );

    this.ytDownloaderWrapper.process(body.videoUrl, `static/${id}/`, id, 'mp4');


    setTimeout(async () => {
      console.log('delete video ' + body.videoUrl);
      console.log(`delete 'static/${id}/${id}.mp4'`);
      const res = await this.appService.runInCommandLine(
          `rm -rf static/${id}`,
      );
    }, 300_000)

    console.log("done")
    return {
      baseUrl: `http://localhost:3088/`, // todo
      crop: `/download/${id}/${id}-clip.mp4`,
      download: `/download/${id}/${id}.mp4`,
      logs: logs,
    };
  }
}
