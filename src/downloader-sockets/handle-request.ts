import {Socket} from "socket.io";
import {YtDownloaderWrapper} from "../cli-wrapper/yt-downloader-wrapper";
import {DownloadService} from "../cli-wrapper/download.service";

export class HandleRequest {
    static newDownloadRequest(socket: Socket) {
        socket.on('download-req', msg => {
            console.log("new request: ", msg)
            DownloadService.download({videoUrl: msg.link})
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
                socket.emit('download-done', {link: `http://localhost:3000/${data.id}/${data.id}`, pid: data.pid} )
            })
            YtDownloaderWrapper.DownloadEvent.on(YtDownloaderWrapper.EventNames.ERROR, (data) => {
                console.log("error", data)
                socket.emit('download-error', data)
            })
        })
    }
}