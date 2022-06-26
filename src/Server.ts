import express, {Express} from "express";
import bodyParser from "body-parser";
import {SocketService} from "./services/socketServices/SocketService";

const socketio = require('socket.io');
const path = require('path');

export class Server {
    static io: any;

    constructor() {
    }

    static createApp() {
        const app = express();
        const http = require('http');
        const server = http.createServer(app)
        Server.io = socketio(server);

        app.use(bodyParser.json());
        app.use(express.static(path.join(__dirname, 'public')));
        this.setupRouters(app);
        SocketService.setup();

        return server;
    }

    static setupRouters(app: Express) {
        app.get('/test', (req: any, res: any) => {
            res.send('Test route.')
        })
    }

}
