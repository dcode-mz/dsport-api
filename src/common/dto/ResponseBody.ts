export class ResponseBody<T> {
  msg: string;
  payload: T;
  successful: boolean;

  constructor(msg: string, payload: T, successful: boolean) {
    this.msg = msg;
    this.payload = payload;
    this.successful = successful;
  }
}
