export class Utils {

    static getFilename(id: string, format: 'mp4' | 'mp3' = 'mp4'){
        return `${id}/${id}.mp4`
    }
}
