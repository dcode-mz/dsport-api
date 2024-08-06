export class ResponseBody<T> {
    msg: String;
    payload: T;
    successful: boolean;

    constructor(msg: String, payload: T, successful: boolean) {
        this.msg = msg;
        this.payload = payload;
        this.successful = successful;
    }
}