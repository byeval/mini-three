export default class Headers extends Map {
  constructor(obj) {
    super();
    Object.keys(obj).forEach((key) => {
      this.set(key, obj[key]);
    });
  }
}
