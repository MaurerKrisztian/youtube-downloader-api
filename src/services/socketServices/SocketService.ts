import {Server} from "../../Server";
import {Socket} from "socket.io";
import {HandleRequest} from "../../downloader-sockets/handle-request";

export class SocketService {
    constructor() {
    }

    static setup() {
        Server.io.on('connection', (socket: Socket) => {
            HandleRequest.newDownloadRequest(socket);
        })
    }
}
