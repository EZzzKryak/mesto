// Доступ к необходимым элементам на странице:
// Получаем попапы на странице
const profilePopupElement = document.querySelector('.popup_type_profile');
const placePopupElement = document.querySelector('.popup_type_place');
const imgPopupElement = document.querySelector('.popup_type_img');
// Получаем кнопки открытия попапов
const profileEditingButtonElement = document.querySelector('.profile__edit-btn');
const placeAdditingButtonElement = document.querySelector('.profile__add-btn');
// Получаем кнопки закрытия попапов
const closeButtonElements = document.querySelectorAll('.popup__close');
// Получаем данные профиля на странице и инпуты формы профиля (для связи)
const profilePopupNameInput = profilePopupElement.querySelector('.popup__input_type_name');
const profilePopupJobInput = profilePopupElement.querySelector('.popup__input_type_job');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');
// Получаем форму карточки места
const formInPlacePopupElement = placePopupElement.querySelector('.popup__form');
// Получаем попап-картинку и её название (подпись снизу)
const bigImgPopupElement = imgPopupElement.querySelector('.popup__img')
const bigImgNamePopupElement = imgPopupElement.querySelector('.popup__img-name');
// Получаем инпуты формы для добавления картинок
const placePopupNameInput = placePopupElement.querySelector('.popup__input_type_pic-name');
const placePopupLinkInput = placePopupElement.querySelector('.popup__input_type_pic-link');
// Получаем секцию с карточками мест и шаблон-template карточки места (для создания новых карточек)
const cardsContainer = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;


// Добавляем начальные карточки на страницу из массива в constants.js
initialCards.forEach(card => {
  renderPlace(card);
});


//Функции:
// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
// Сохранение данных профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  const popup = evt.target.closest('.popup');
  profileNameElement.textContent = profilePopupNameInput.value;
  profileJobElement.textContent = profilePopupJobInput.value;
  closePopup(popup);
}
// Сохранение данных карточки
function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  const popup = evt.target.closest('.popup');
  renderPlace({name: placePopupNameInput.value, link: placePopupLinkInput.value})
  closePopup(popup);
}
// Создание карточки
function createPlace(data) {
  // Делаем глубокое клонирование шаблона в новую переменную
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  // Наполняем атрибуты копии шаблона инфой из данных формы (объекта, который возвращает форма)
  placeElement.querySelector('.place__name').textContent = data.name;
  placeElement.querySelector('.place__img').src = data.link;
  placeElement.querySelector('.place__img').alt = data.name;
  // Фаршируем копию шаблона событиями:
  // Событие лайка карточки (шаблона)
  placeElement.querySelector('.place__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like_active');
  });
  // Событие удаления карточки (шаблона)
  placeElement.querySelector('.place__remove').addEventListener('click', (evt) => {
    evt.target.closest('.place').remove();
  });
  // Событие открытия попапа-картинки
  placeElement.querySelector('.place__img').addEventListener('click', (evt) => {
    // Наполняем атрибуты попапа из атрибутов картинки, на которую нажали
    bigImgPopupElement.src = evt.target.src;
    bigImgPopupElement.alt = evt.target.alt;
    bigImgNamePopupElement.textContent = data.name;
    openPopup(imgPopupElement);
  });
  // Возвращаем получившуюся карточку (шаблон)
  return placeElement;
}
// Размещение новой карточки на странице
function renderPlace(card) {
  const cardElement = createPlace(card);
  cardsContainer.prepend(cardElement);
}


// Обработчики событий:
// Открытие попапов
profileEditingButtonElement.addEventListener('click', () => {
  profilePopupNameInput.value = profileNameElement.textContent;
  profilePopupJobInput.value = profileJobElement.textContent;
  openPopup(profilePopupElement);
});
placeAdditingButtonElement.addEventListener('click', () => {
  formInPlacePopupElement.reset();
  openPopup(placePopupElement);
});
// Закрытие попапов при помощи цикла с обработчиком событий
closeButtonElements.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// Сохранение данных профиля
profilePopupElement.addEventListener('submit', handleProfileFormSubmit);
// Сохранение данных карточки
placePopupElement.addEventListener('submit', handlePlaceFormSubmit);



