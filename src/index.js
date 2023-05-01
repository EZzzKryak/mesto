import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './utils/constants.js';
import { objForValidation } from './utils/validationConfig.js';

// Доступ к необходимым элементам на странице:
// Получаем попапы на странице
const popupElements = document.querySelectorAll('.popup');
const profilePopupElement = document.querySelector('.popup_type_profile');
const placePopupElement = document.querySelector('.popup_type_place');
// Получаем формы
const profileForm = profilePopupElement.querySelector('.popup__form_type_profile');
const placeForm = placePopupElement.querySelector('.popup__form_type_place');
// Получаем кнопки открытия попапов
const profileEditingButtonElement = document.querySelector('.profile__edit-btn');
const placeAdditingButtonElement = document.querySelector('.profile__add-btn');
// Получаем кнопки закрытия попапов
const closeButtonElements = document.querySelectorAll('.popup__close');
// Получаем данные профиля на странице и инпуты формы профиля (для связи)
const profilePopupNameInput = profileForm.querySelector('.popup__input_type_name');
const profilePopupJobInput = profileForm.querySelector('.popup__input_type_job');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');
// Получаем инпуты формы для добавления картинок
const placePopupNameInput = placeForm.querySelector('.popup__input_type_pic-name');
const placePopupLinkInput = placeForm.querySelector('.popup__input_type_pic-link');
// Получаем секцию с карточками мест и шаблон-template карточки места (для создания новых карточек)
const cardsContainer = document.querySelector('.places');



const cardList = new Section({items: initialCards, renderer: (cardData) => {
  const card = new Card(cardData, '#place', openPopupImg);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}}, '.places');

cardList.renderItems();


// Создание новых экземпляров форм на основе класса FormValidator
const profileValidation = new FormValidator(objForValidation, profileForm);
const placeValidation = new FormValidator(objForValidation, placeForm);
// "Включение" валидации форм
profileValidation.enableValidation();
placeValidation.enableValidation();


const placeAdditingForm = new PopupWithForm({popupSelector: '.popup_type_place', handleFormSubmit: (formData) => {
  const card = new Card(formData, '#place', openPopupImg);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}});

// Открытие формы добавления карточек
placeAdditingButtonElement.addEventListener('click', () => {
  placeAdditingForm.open();
  placeAdditingForm.setEventListeners();
  placeValidation.resetValidation();
});

// Открытие попапа с картинкой
function openPopupImg(evt) {
  const cardImage = new PopupWithImage('.popup_type_img');
  cardImage.open(evt);
  cardImage.setEventListeners();
}

// Закрытие попапа
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   // Удаляю обработчик закрытия попапа на клавишу 'Escape'
//   document.removeEventListener('keydown', closePopupByEscape);
// }
// // Закрытие попапа на клавишу 'Escape'
// function closePopupByEscape(evt) {
//   popupElements.forEach(popup => {
//     if (evt.key === 'Escape') {
//       closePopup(popup);
//     }
//   })
// }
// // Закрытие попапа на оверлей
// function closePopupByClickOnOverlay(evt) {
//   if (evt.target !== evt.currentTarget) {
//     return;
//   }
//   closePopup(evt.target);
// }
// Сохранение данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const popup = evt.target.closest('.popup');
  profileNameElement.textContent = profilePopupNameInput.value;
  profileJobElement.textContent = profilePopupJobInput.value;
  closePopup(popup);
}
// Сохранение данных карточки
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const popup = evt.target.closest('.popup');
  renderPlace({name: placePopupNameInput.value, link: placePopupLinkInput.value})
  closePopup(popup);
}

// Обработчики событий:
// Открытие попапов
// profileEditingButtonElement.addEventListener('click', () => {
//   profileEditingForm.open();
//   profilePopupNameInput.value = profileNameElement.textContent;
//   profilePopupJobInput.value = profileJobElement.textContent;
//   profileValidation.resetValidation();
// });

// Рендер начальных карточек на странице из массива constants.js
// initialCards.forEach(initialCard => {
//   renderPlace(initialCard);
// });


// Карточки и попапы
// Размещаение новых карточек на странице
// function renderPlace(placeCard) {
//   const cardElement = createCard(placeCard);
//   cardsContainer.prepend(cardElement);
// }
// Создание карточки на основе экземпляра класса Card
// function createCard(cardItem) {
//   const card = new Card(cardItem, '#place', openPopupImg);
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// placeAdditingButtonElement.addEventListener('click', () => {
//   placeForm.reset();
//   // openPopup(placePopupElement);
//   placeValidation.resetValidation();
// });
// Закрытие попапов на крестик
// closeButtonElements.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });
// Закрытие попапов на оверлей
// popupElements.forEach(popup => {
//   popup.addEventListener('mousedown', closePopupByClickOnOverlay);
// });
// Сохранение данных профиля
// profilePopupElement.addEventListener('submit', handleProfileFormSubmit);
// Сохранение данных карточки
// placePopupElement.addEventListener('submit', handlePlaceFormSubmit);
