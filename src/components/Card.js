export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    // Получаем необходимые элементы карточки
    this._likeCardBtn = this._card.querySelector('.place__like');
    this._deleteCardBtn = this._card.querySelector('.place__remove');
    this._cardImage = this._card.querySelector('.place__img');
    this._cardName = this._card.querySelector('.place__name');
    // Навешиваем события на карточку
    this._setEventListeners();
    // Наполняем атрибуты копии шаблона инфой из данных формы (объекта, который возвращает форма)
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    // Возвращаем полученную карточку
    return this._card;
  }
  // Лайк карточки
  _likeCard() {
    this._likeCardBtn.classList.toggle('place__like_active');
  };
  // Удаление карточки
  _removeCard() {
    this._card.remove();
  }
  // Навешивание обработчиков
  _setEventListeners() {
    // 1. Лайк
    this._likeCardBtn.addEventListener('click', () => {
      this._likeCard();
    });
    // 2. Удаление
    this._deleteCardBtn.addEventListener('click', () => {
      this._removeCard();
    });
    // 3. Открытие попапа-картинки (метод в классе PopupWithImage)
    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });

  }
}
