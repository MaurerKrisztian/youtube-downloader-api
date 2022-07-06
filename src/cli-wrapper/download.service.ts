import {YtDownloaderWrapper} from "./yt-downloader-wrapper";
import { v4 as uuidv4 } from 'uuid';
import {exec} from "child_process";
import {Utils} from "../utils/Utils";

export class DownloadService {
    static readonly REMOVE_FILE_MS = 300_000

    static async download(body: { videoUrl: string, format: 'mp4'  | 'webm' }) {
        const ytDownloaderWrapper = new YtDownloaderWrapper()
        const id = uuidv4();

        console.log('download video ' + body.videoUrl);

        const fileFormat = body.format || 'mp4'
        ytDownloaderWrapper.process(body.videoUrl, id,`static/${id}/`,`${id}.${fileFormat}`, fileFormat);


        setTimeout(async () => {
            console.log('delete video ' + body.videoUrl);
            console.log(`delete 'static/${id}/${id}.mp4'`);
            const res = await DownloadService.runInCommandLine(
                `rm -rf static/${id}`,
            );
        }, this.REMOVE_FILE_MS)

        console.log("done")
        return id;
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
