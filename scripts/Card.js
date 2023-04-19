export default class Card {
  constructor(cardData, templateSelector, openPopupFunc) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._imgPopupElement = document.querySelector('.popup_type_img');
    this._bigImgPopupElement = this._imgPopupElement.querySelector('.popup__img')
    this._bigImgNamePopupElement = this._imgPopupElement.querySelector('.popup__img-name');
    this._openPopupFunc = openPopupFunc;
  }
  // Получение разметки темплейта карточки
  _getTemplate() {
    // Делаем глубокое клонирование шаблона в новую переменную
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    // Возвращаем получившуюся карточку (шаблон)
    return cardTemplate;
  }
  // Создание готовой карточки
  generateCard() {
    // Создаём новую карточку из темплейта для дальнейшей работы с ней
    this._card = this._getTemplate();
    // Навешиваем события на карточку
    this._setEventListeners();
    // Наполняем атрибуты копии шаблона инфой из данных формы (объекта, который возвращает форма)
    this._card.querySelector('.place__name').textContent = this._name;
    this._card.querySelector('.place__img').alt = this._name;
    this._card.querySelector('.place__img').src = this._link;
    // Возвращаем полученную карточку
    return this._card;
  }
  // Лайк карточки
  _likeCard() {
    this._card.querySelector('.place__like').classList.toggle('place__like_active');
  };
  // Удаление карточки
  _removeCard() {
    this._card.remove();
  }
  // Открытие попапа-картинки карточки
  _openPopupImage(evt) {
    this._bigImgPopupElement.src = evt.target.src;
    this._bigImgPopupElement.alt = evt.target.alt;
    this._bigImgNamePopupElement.textContent = this._name;
    this._openPopupFunc(this._imgPopupElement);
  }
  // Навешивание обработчиков
  _setEventListeners() {
    // 1. Лайк
    this._card.querySelector('.place__like').addEventListener('click', () => {
      this._likeCard();
    });
    // 2. Удаление
    this._card.querySelector('.place__remove').addEventListener('click', () => {
      this._removeCard();
    });
    // 3. Открытие попапа-картинки
    this._card.querySelector('.place__img').addEventListener('click', (evt) => {
      this._openPopupImage(evt);
    });
  }
}
