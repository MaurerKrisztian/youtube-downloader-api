import {MyLogger} from "./Logger";
import {Server} from "./Server";
require('dotenv/config')

MyLogger.logger.level = "trace"

const server = Server.createApp();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    MyLogger.debug("App listening on port " + PORT);
});
