/**
 * @namespace services
 */

/**
 * Class for managing localstorage data for the app
 * @memberof services
 */
export default class LsService {
  constructor() {
    /**
     * @property {string} appKey current app key in localstorage
     */
    this.appKey = "";
  }

  /**
   * @property {Function} init initializing localstorage data
   * @param {string} appKey appKey
   * @param {Object} data data to be put in the localstorage
   */
  init(appKey, data = {}) {
    LsService.set(appKey, data);
    this.appKey = appKey;
  }

  /**
   * @property {Function} get localstorage getter
   * @param {string} key localstorage key
   * @returns {Object}
   */
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * @property {Function} set localstorage setter
   * @param {string} key localstorage key
   * @param {Object} key localstorage value
   * @returns {Object}
   */
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @property {Function} delete removing localstorage item
   * @param {string} key localstorage key
   */
  delete(key) {
    localStorage.removeItem(key);
  }

  /**
   * @property {Function} clear clearing out localstorage item
   */
  clear() {
    this.set(this.appKey, "");
  }

  /**
   * @property {Function} list gets all localstorage data
   * @returns {Object}
   */
  static list() {
    const output = {};

    for (let [key, value] of Object.entries(localStorage)) {
      output[key] = value;
    }

    return output;
  }

  /**
   * @property {Function} reset wiping out localstorage data completely
   */
  static reset() {
    localStorage.clear();
  }
}

