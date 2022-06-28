import {MyLogger} from "./Logger";
import {Server} from "./Server";
require('dotenv/config')

MyLogger.logger.level = "trace"

const server = Server.createApp();

const PORT = 3088;
server.listen(PORT, () => {
    MyLogger.debug("App listening on port " + PORT);
});
