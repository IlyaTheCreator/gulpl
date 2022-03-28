import { widgetTypes } from "../constants";

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
  static create(content, type, classes = [], onClick) {
    const widget = document.createElement("div");

    if (type === widgetTypes.LIST) {
      classes.push("widget");
    }

    if (type === widgetTypes.CITY) {
      classes.push("widget");
      classes.push("widget-rounded");
    }

    classes.forEach((className) => widget.classList.add(className));
    widget.innerHTML = content;
    widget.addEventListener("click", (e) => {
      onClick(e);
      e.stopPropagation();
    });

    return widget;
  }
}

