/**
 * @namespace entities
 */

/**
 * Class for managing creating widgets - ui components
 * @memberof entities
 */
export default class Widget {
  /**
   * @property {Function} create creating a widget
   * @param {Object} content 
   * @param {string} type 
   * @param {Function} onClick 
   * @param {Array} classes 
   * @returns {HTMLBodyElement}
   */
  static create(content, type, onClick, classes = []) {
    const widget = document.createElement("div");

    if (type === "list") {
      classes.push("widget");
    }

    if (type === "city") {
      classes.push("widget");
      classes.push("widget-rounded");
    }

    classes.forEach((className) => widget.classList.add(className));
    widget.innerHTML = content;
    widget.addEventListener("click", onClick);

    return widget;
  }
}

