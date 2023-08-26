export default class Entry{
    time: string;
    category: string;
    date: number;
    cause?: string;

    constructor(time: string, category: string, cause?:string) {
        this.date = Date.now();
        this.time = time
        this.category = category;
        if (cause) this.cause = cause
    }

}