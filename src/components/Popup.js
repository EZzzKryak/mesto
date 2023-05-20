export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._submitBtn = this._popup.querySelector('.popup__submit');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    // Вешаю обработчик закрытия попапа на клавишу 'Escape'
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // Удаляю обработчик закрытия попапа на клавишу 'Escape'
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие на клавишу 'Escape'
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Закрытие нажатием на оверлей
  _handleOverlayClose(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.close();
  }

  // Прелоадер для формы
  isLoading(isLoadingStatus) {
    if(isLoadingStatus) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = 'Сохранить';
    }
  }

  // Навешивание обработчиков
  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close');
    // Закрытие попапа на крестик
    this._closeButton.addEventListener('click', this.close.bind(this));
    // Закрытие попапа на оверлей
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }
}
