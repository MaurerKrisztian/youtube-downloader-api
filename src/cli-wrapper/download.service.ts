import {YtDownloaderWrapper} from "./yt-downloader-wrapper";
import { v4 as uuidv4 } from 'uuid';
import {exec} from "child_process";

export class DownloadService {
    static async download(body: { videoUrl: string }) {
        const ytDownloaderWrapper = new YtDownloaderWrapper()
        const id = uuidv4();

        console.log('download video ' + body.videoUrl);

        ytDownloaderWrapper.process(body.videoUrl, id,`static/${id}/`, id, 'mp4');


        setTimeout(async () => {
            console.log('delete video ' + body.videoUrl);
            console.log(`delete 'static/${id}/${id}.mp4'`);
            const res = await DownloadService.runInCommandLine(
                `rm -rf static/${id}`,
            );
        }, 300_000)

        console.log("done")
        return {
            baseUrl: `http://localhost:3088/`, // todo
            crop: `/download/${id}/${id}-clip.mp4`,
            download: `/download/${id}/${id}.mp4`,
        };
    }

    static runInCommandLine(command: string) {
        return new Promise(async (resolve, reject) => {
            console.log("RUN COMMAND: " + command);
            await exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                console.log(`stdout ${stdout}`);
                resolve(stdout);
            });
        });
    }
}