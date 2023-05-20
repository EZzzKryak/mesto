export default class Card {
  constructor(cardData, templateSelector, myId, handleCardClick, handleDeleteCard, handleSetLike, handleRemoveLike) {
    this._name = cardData.name;
    this._link = cardData.link;
    // Айди создателя карточки
    this._ownerId = cardData.owner._id
    // Мой айди
    this._myId = myId;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
  }
  // Получение разметки темплейта карточки
  _getTemplate() {
    // Делаем глубокое клонирование шаблона в новую переменную и возвращаем шаблон
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
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
    this.likeCounter = this._card.querySelector('.place__like-counter');
    // Навешиваем события на карточку
    this._deleteCardBtnVisibility();
    this._handlelikeButtonState();
    this._setEventListeners();
    this._setLikesCounter();
    // Наполняем атрибуты копии шаблона инфой из данных формы (объекта, который возвращает форма)
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    // Возвращаем полученную карточку
    return this._card;
  }

  // Метод лайка карточки
  handleLikeClick(cardData) {
    // Присваивание карточке обновлённого массива с лайками, который приходит с сервера
    this._likes = cardData.likes;
    this._handlelikeButtonState();
    this._setLikesCounter();
  }

  // Метод удаления карточки
  handleRemoveCard() {
    this._card.remove();
  }

  // Метод для корректного отображения числа лайков, записывается в элемент под сердечком
  _setLikesCounter() {
    this.likeCounter.textContent = this._likes.length;
  }

  // Возвращает true, если в массиве лайков карточки есть мой лайк (по id)
  _hasMyLike() {
    return this._likes.some(like => like._id === this._myId);
  }

  // Скрывает кнопку удаления карточки, если её создатель не я (по id у owner)
  _deleteCardBtnVisibility() {
    if(this._ownerId !== this._myId) {
      this._deleteCardBtn.classList.add('place__remove_type_invisible');
    }
  }

  // Метод для корректного отображения состояния кнопки лайка
  _handlelikeButtonState() {
    if(this._hasMyLike()) {
      this._likeCardBtn.classList.add('place__like_active');
    } else {
      this._likeCardBtn.classList.remove('place__like_active');
    }
  };

  // Навешивание обработчиков
  _setEventListeners() {
    // 1. Лайк
    this._likeCardBtn.addEventListener('click', () => {
      // Если карточка, на лайк которой нажимаю имеет мой лайк
      if(this._hasMyLike()) {
        // Передаётся в виде колбэка в Card для удаления лайка
        this._handleRemoveLike();
      } else {
        // Передаётся в виде колбэка в Card для постановки лайка
        this._handleSetLike();
      }
    });
    // 2. Удаление
    this._deleteCardBtn.addEventListener('click', () => {
        // Передаётся в виде колбэка в Card для удаления карточки
      this._handleDeleteCard();
    });
    // 3. Открытие попапа-картинки
    this._cardImage.addEventListener('click', (evt) => {
      // Передаётся в виде колбэка в Card для открытия попапа-картинки
      this._handleCardClick(evt);
    });
  }
}
