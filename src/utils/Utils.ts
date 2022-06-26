export class Utils {

    static formatMessage(username: string, text: string): IMessage {
        return {
            username: username,
            text: text,
            time: new Date()
        }
    }

}

export interface IMessage {
    username: string,
    text: string,
    time: Date;
}
