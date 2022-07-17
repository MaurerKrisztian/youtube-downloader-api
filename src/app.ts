import {MyLogger} from "./Logger";
import {Server} from "./Server";
import path from "path";
require('dotenv/config')

MyLogger.logger.level = "trace"

const server = Server.createApp();


export const BIN_PATH = path.join(__dirname, 'yt-dlp-bin')
console.log("bin-path", BIN_PATH)
async function getYtDlpBin() {
    const YTDlpWrap = require('yt-dlp-wrap').default;
    await YTDlpWrap.downloadFromGithub(BIN_PATH);
}

getYtDlpBin().catch(err => console.log(err))

const PORT = 3088;
server.listen(PORT, () => {
    MyLogger.debug("App listening on port " + PORT);
});
