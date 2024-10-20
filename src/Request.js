export default class Request {
  constructor(url) {
    this.url = url;
    this.options = {
      method: 'GET',
    };
  }
}
