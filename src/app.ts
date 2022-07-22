import {MyLogger} from "./Logger";
import {Server} from "./Server";
import path from "path";
require('dotenv/config')

MyLogger.logger.level = process.env.LOG_LEVEL || "trace"

export let BIN_PATH = 'yt-dlp'
if (process.env.USE_BIN){
    BIN_PATH =  path.join(__dirname, 'bin', 'yt-dlp-linux-bin')
}

MyLogger.debug(`Bin path: ${BIN_PATH}`)

export const PORT = process.env.PORT || 3088;
export const SELF_URL = process.env.SELF_URL || `http://localhost:${PORT}` //'https://test.mytaskplan.me'

const server = Server.createApp();
server.listen(PORT, () => {
    MyLogger.debug("App listening on port " + PORT);
});
