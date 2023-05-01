export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  addItem(element) { // setItem()
    this._container.prepend(element);
  }
}
