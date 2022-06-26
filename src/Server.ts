import express, {Express} from "express";
import bodyParser from "body-parser";
import {SocketService} from "./services/socketServices/SocketService";

const socketio = require('socket.io');
const path = require('path');
const cors = require('cors')

const http = require('http');

export class Server {
    static io: any;

    constructor() {
    }

    static createApp() {
        const app = express();

        app.use(cors())
        const server = http.createServer(app)
        Server.io = socketio(server,  {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });


        app.use(bodyParser.json());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(express.static(path.join(__dirname, '/../static')));
        // app.use(express.static(path.join('./static')));
        // console.log(path.join(__dirname, 'static'))
        // app.use('/static', express.static(path.join(__dirname, 'static')))
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
