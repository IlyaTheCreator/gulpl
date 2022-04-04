export default class LsService {
  constructor() {
    this.appKey = "";
  }

  init(appKey, data = {}) {
    LsService.set(appKey, data);
    this.appKey = appKey;
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  delete(key) {
    localStorage.removeItem(key);
  }

  clear() {
    this.set(this.appKey, "");
  }

  static list() {
    const output = {};

    for (let [key, value] of Object.entries(localStorage)) {
      output[key] = value;
    }

    return output;
  }

  static reset() {
    localStorage.clear();
  }
}
