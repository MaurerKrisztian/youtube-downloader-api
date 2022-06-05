import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async crop(@Body() body: { videoUrl: string; clipSearch: string }) {
    const id = uuidv4();

    console.log('download video ' + body.videoUrl);
    const logs = await this.appService.runInCommandLine(
      `yt-dlp "${body.videoUrl}" --write-auto-sub --sub-lang en -f 22 -o static/${id}/${id}.mp4`,
    );

    const logs3 = await this.appService.runInCommandLine(
      `youtube-dl --write-auto-sub --write-sub --sub-lang hu --convert-subs srt --skip-download "${body.videoUrl}" -o static/${id}/${id}.hu.vtt`,
    );

    console.log('cut video, serch ' + body.clipSearch);
    const logs2 = await this.appService.runInCommandLine(
      `videogrep --input static/${id}/${id}.mp4 --search "${body.clipSearch}" -o ./static/${id}/${id}-clip.mp4`,
    );

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
