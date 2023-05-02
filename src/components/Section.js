export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    // Функция renderer используется в качестве колбэк-функции для реализации слабой связи между компонентами.
    // В данном случае будет создавать экземпляр класса Card и вставлять его в разметку
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Вызывает renderer для каждого элемента массива.
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  // Размещает созданный элемент в разметке (контейнере)
  addItem(element) {
    this._container.prepend(element);
  }
}
