import {Socket} from "socket.io";
import {YtDownloaderWrapper} from "../cli-wrapper/yt-downloader-wrapper";
import {DownloadService} from "../cli-wrapper/download.service";
import {Utils} from "../utils/Utils";

export class HandleRequest {
    static newDownloadRequest(socket: Socket) {
        socket.on('download-req', msg => {
            console.log("new request: ", msg)
            DownloadService.download({videoUrl: msg.link, format: msg.format})
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.START, (data) => {
                console.log("start", data)
                socket.emit('download-progress', data)
            })
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.PROGRESS, (data) => {
                console.log("progress", data)
                socket.emit('download-progress', data)
            })
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.DONE, (data) => {
                console.log("done", data)
                socket.emit('download-done', {link: `https://test.mytaskplan.me/${data.pathWithFilename}`, pid: data.pid} ) // todo from env
            })
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.ERROR, (data) => {
                console.log("error", data)
                socket.emit('download-error', data)
            })
        })
    }
}
