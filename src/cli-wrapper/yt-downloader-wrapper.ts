import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {EventEmitter} from "events";

export interface IProgressObject {
    percent: number,
    totalSize: string,
    currentSpeed: string,
    eta: string,

    meta?: { pid: number, customId: string }
}

export class YtDownloaderWrapper {

    static DownloadEvent = new EventEmitter();
    static EventNames = {
        START: 'start',
        PROGRESS: 'progress',
        DONE: 'done',
        ERROR: 'error'
    }

    PROGRESS_REGEX = /\[download\] *(.*) of ([^ ]*)(:? *at *([^ ]*))?(:? *ETA *([^ ]*))?/;

    constructor() {
        YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.START, (data) => {
            console.log("start", data)
        })
        YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.PROGRESS, (data) => {
            console.log("progress", data)
        })
        YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.DONE, (data) => {
            console.log("done", data)
        })
        YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.ERROR, (data) => {
            console.log("error", data)
        })
    }


    processLine(outputLine: string, pid: number) {
        let progressMatch = outputLine.match(this.PROGRESS_REGEX);

        let progressObject: IProgressObject = {percent: 0, totalSize: '0', eta: '0', currentSpeed: '0'};

        if (progressMatch) {
            progressObject.percent = parseFloat(
                progressMatch[1].replace('%', '')
            );
            progressObject.totalSize = progressMatch[2].replace(
                '~',
                ''
            );
            progressObject.currentSpeed = progressMatch[4];
            progressObject.eta = progressMatch[6];
            YtDownloaderWrapper.DownloadEvent.emit(YtDownloaderWrapper.EventNames.PROGRESS, {
                ...progressObject,
                meta: {pid}
            })
        }

        return progressObject
    }

    process(link: string, id: string, path: string = './download', filename: string = "video", format: 'mp4' | 'webm' = 'mp4') {
        YtDownloaderWrapper.DownloadEvent.emit(YtDownloaderWrapper.EventNames.START, link)

        let ytDlpProcess:  ChildProcessWithoutNullStreams
        if (format == 'mp4') {
             ytDlpProcess = spawn('yt-dlp', [link, '-P', path, '-o', `${filename}`, '-f', format]);
        } else {
             ytDlpProcess = spawn('yt-dlp', [link, '-P', path, '-o', `${filename}`, '-x', '--audio-format', 'webm']);
        }

        ytDlpProcess.stdout.on('data', (data) => {
                let outputLines = data.toString().split(/\r|\n/g).filter(Boolean);
                for (const outputLine of outputLines) {
                    this.processLine(outputLine, ytDlpProcess.pid)
                }
            }
        );
        ytDlpProcess.stderr.on(
            'data',
            (data) => {
                console.error(data);
            }
        );
        ytDlpProcess.on('error', (error) => {
            YtDownloaderWrapper.DownloadEvent.emit(YtDownloaderWrapper.EventNames.ERROR, error)
            console.error(error)
        });

        ytDlpProcess.on('close', (code) => {
            YtDownloaderWrapper.DownloadEvent.emit(YtDownloaderWrapper.EventNames.DONE, {
                code: code,
                id: id,
                pid: ytDlpProcess.pid,
                pathWithFilename: `${id}/${filename}` // todo refactor file path
            })
        });
    }

}
