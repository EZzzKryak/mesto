import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    // Достаёю все элементы полей
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._formValues = {};
    // Добавляю в пустой объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // Возвращаю объект значений из инпутов
    return this._formValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    // Сохранение данных профиля
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // В вызове функции _handleFormSubmit передаём в неё объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
