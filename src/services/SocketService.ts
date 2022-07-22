import {Server} from "../Server";
import {Socket} from "socket.io";
import {HandleRequest} from "./handle-request";

export class SocketService {

    static setup() {
        Server.io.on('connection', (socket: Socket) => {
            HandleRequest.newDownloadRequest(socket);
        })
    }
}
