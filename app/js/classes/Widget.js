export default class Widget {
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

