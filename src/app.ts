import {MyLogger} from "./Logger";
import {Server} from "./Server";
import path from "path";
require('dotenv/config')

MyLogger.logger.level = "trace"

const server = Server.createApp();


export const BIN_PATH = path.join(__dirname, 'dw-bin')

console.log(BIN_PATH)
const PORT = process.env.PORT || 3088;
server.listen(PORT, () => {
    MyLogger.debug("App listening on port " + PORT);
});
