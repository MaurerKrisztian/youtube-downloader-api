import {Socket} from "socket.io";
import {YtDownloaderWrapper} from "../cli-wrapper/yt-downloader-wrapper";
import {DownloadService} from "../cli-wrapper/download.service";
import {SELF_URL} from "../app";
import {MyLogger} from "../Logger";

export class HandleRequest {
    static newDownloadRequest(socket: Socket) {
        socket.on('download-req', msg => {
            MyLogger.debug(MyLogger.prettyJsonString(msg))
            console.log("new request: ", msg)
            DownloadService.download({videoUrl: msg.link, format: msg.format})
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.START, (data) => {
                MyLogger.trace(`start: ${MyLogger.prettyJsonString(data)}`)
                socket.emit('download-progress', data)
            })
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.PROGRESS, (data) => {
                MyLogger.trace(`progress: ${MyLogger.prettyJsonString(data)}`)
                socket.emit('download-progress', data)
            })
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.DONE, (data) => {
                MyLogger.trace(`done: ${MyLogger.prettyJsonString(data)}`)
                socket.emit('download-done', {link: `${SELF_URL}/${data.pathWithFilename}`, pid: data.pid})
            })
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.ERROR, (data) => {
                MyLogger.error(`error: ${MyLogger.prettyJsonString(data)}`)
                socket.emit('download-error', data)
            })
        })
    }
}
