import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {objForValidation} from './validationConfig.js';
import {initialCards} from './constants.js';

// Доступ к необходимым элементам на странице:
// Получаем попапы на странице
const popupElements = document.querySelectorAll('.popup');
const profilePopupElement = document.querySelector('.popup_type_profile');
const placePopupElement = document.querySelector('.popup_type_place');
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
// Получаем инпуты формы для добавления картинок
const placePopupNameInput = placePopupElement.querySelector('.popup__input_type_pic-name');
const placePopupLinkInput = placePopupElement.querySelector('.popup__input_type_pic-link');
// Получаем секцию с карточками мест и шаблон-template карточки места (для создания новых карточек)
const cardsContainer = document.querySelector('.places');

// Рендерим начальные карточки на страницу из массива constants.js
initialCards.forEach(initialCard => {
  renderPlace(initialCard);
});

// "Включаем" валидацию для каждой формы на странице
const formElements = Array.from(document.querySelectorAll(objForValidation.formSelector));
formElements.forEach(formItem => {
  const validationForm = new FormValidator(objForValidation, formItem);
  validationForm.enableValidation();
});


//Функции:
// Размещаение новых карточек на странице
function renderPlace(cardItem) {
  const card = new Card(cardItem, '#place', openPopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}
// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // Вешаю обработчик закрытия попапа на клавишу 'Escape'
  document.addEventListener('keydown', closePopupByEscape);
}
// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Удаляю обработчик закрытия попапа на клавишу 'Escape'
  document.removeEventListener('keydown', closePopupByEscape);
}
// Закрытие попапа на клавишу 'Escape'
function closePopupByEscape(evt) {
  popupElements.forEach(popup => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
}
// Закрытие попапа на оверлей
function closePopupByClickOnOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closePopup(evt.target);
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
// Очистка ошибок валидации
function resetValidationError(popup) {
  const spanElements = popup.querySelectorAll('.popup__input-error');
  const inputElements = popup.querySelectorAll('.popup__input');
  spanElements.forEach(span => {
    span.classList.remove('popup__input-error_active');
    span.textContent = '';
  })
  inputElements.forEach(input => {
    input.classList.remove('popup__input_type_error');
  })
}
// Запрет отправки формы при наличии пустого инпута
function disableSubmitWithEmptyInputs(popup) {
  const buttonElement = popup.querySelector('.popup__submit');
  const inputElements = popup.querySelectorAll('.popup__input');
  inputElements.forEach((input) => {
    if(!input.value) {
      buttonElement.setAttribute('disabled', '');
      buttonElement.classList.add('popup__submit_disabled');
    }
  });
}


// Обработчики событий:
// Открытие попапов
profileEditingButtonElement.addEventListener('click', () => {
  profilePopupNameInput.value = profileNameElement.textContent;
  profilePopupJobInput.value = profileJobElement.textContent;
  openPopup(profilePopupElement);
  resetValidationError(profilePopupElement);
  disableSubmitWithEmptyInputs(profilePopupElement);
});
placeAdditingButtonElement.addEventListener('click', () => {
  formInPlacePopupElement.reset();
  openPopup(placePopupElement);
  resetValidationError(placePopupElement);
  disableSubmitWithEmptyInputs(placePopupElement);
});
// Закрытие попапов на крестик
closeButtonElements.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// Закрытие попапов на оверлей
popupElements.forEach(popup => {
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
});
// Сохранение данных профиля
profilePopupElement.addEventListener('submit', handleProfileFormSubmit);
// Сохранение данных карточки
placePopupElement.addEventListener('submit', handlePlaceFormSubmit);
