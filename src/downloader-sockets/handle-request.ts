import {Socket} from "socket.io";

export class HandleRequest {
    static newDownloadRequest(socket: Socket) {
        socket.on('download-req', msg => {
            console.log("new request: ", msg)

            setInterval(()=>{
                console.log("send back")
                socket.emit('download-progress', "this is a message from the server" + socket.id)
            }, 1000)
        })
    }
}