import {getLogger, Logger} from "log4js";


export class MyLogger {
    static logger: Logger = getLogger();

    constructor() {
    }

    // level: trace
    static trace(message: string) {
        this.logger.trace(message);
    }

    // level: debug
    static debug(message: string) {
        this.logger.debug(message);
    }

    // level: info
    static info(message: string) {
        this.logger.info(message);
    }

    // level: warn
    static warn(message: string) {
        this.logger.warn(message);
    }

    // level: error
    static error(message: string) {
        this.logger.error(message);
    }

    // level: fatal
    static fatal(message: string) {
        this.logger.fatal(message);
    }

    static prettyJsonString(obj: any) {
        return '\n' + JSON.stringify(obj, null, '\t')
    }

}
