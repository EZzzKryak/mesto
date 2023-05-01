import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupName = this._popup.querySelector('.popup__img-name');
  }

  open(evt) {
    super.open();
    this._popupImg.src = evt.target.src;
    this._popupImg.alt = evt.target.alt;
    this._popupName.textContent = evt.target.alt;
  }
}
