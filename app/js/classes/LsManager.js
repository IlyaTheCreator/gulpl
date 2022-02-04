export default class LsManager {
  constructor() {
    this.appKey = "";
  }

  init(appKey, data = {}) {
    this.set(appKey, data);
    this.appKey = appKey;
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value) {
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

