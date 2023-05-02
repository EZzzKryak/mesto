import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  objForValidation,
  placeAdditingButtonElement,
  placeForm,
  profileEditingButtonElement,
  profileForm,
  profilePopupJobInput,
  profilePopupNameInput
} from '../utils/constants.js';
import './index.css';

// - Секция с карточками на странице -
// Создаю экземпляры карточек Card и размещаю их на странице при помощи класса Section,
// который принимает массив данных items (который необходимо отобразить на странице)
// и колбэк-функцию renderer для создания отдельной карточки и её вставку на страницу
const cardList = new Section({items: initialCards, renderer: (cardData) => {
  // Ф-я createCard создаёт карточку и возвращает её (реализация ниже)
  const cardElement = createCard(cardData);
  cardList.addItem(cardElement);
}}, '.places');
// Размещаю карточки на странице
cardList.renderItems();
// Создание экземпляра класса Card
function createCard(cardItem) {
  // openPopupImg - функция открытия фото карточки в увеличенном размере (реализация функции в секции с попапом-картинкой)
  const card = new Card(cardItem, '#place', openPopupImg);
  const cardElement = card.generateCard();
  return cardElement;
}

// - Секция с формой добавления новой карточки -
// Создаю экземпляр формы для добавления карточки PopupWithForm, колбэк-функция которой
// принимает объект из инпутов формы и на их основе создаёт новый экземпляр карточки Card,
// а затем размещает на странице
const placeAdditingForm = new PopupWithForm({popupSelector: '.popup_type_place', handleFormSubmit: (formData) => {
  // openPopupImg - функция открытия фото карточки в увеличенном размере (реализация функции в секции с попапом-картинкой)
  const cardElement = createCard(formData);
  cardList.addItem(cardElement);
  placeAdditingForm.close();
  }
});
// Событие открытия формы добавления новой карточки
placeAdditingButtonElement.addEventListener('click', () => {
  placeAdditingForm.open();
  placeValidation.resetValidation();
});
// Навешиваю слушатели на форму добавления новой карточки
placeAdditingForm.setEventListeners();

// - Секция с попапом-картинкой карточки-
// Создаю экземпляр попапа-картинки, в котором при клике на фото карточки оно (фото) открывается в увеличенном размере
const cardImage = new PopupWithImage('.popup_type_img');
// Функция открытия попапа-картинки, необходимая для экземпляров Card
function openPopupImg(evt) {
  cardImage.open(evt);
}
// Навешиваю слушатели на попап-картинку карточки
cardImage.setEventListeners();

// - Секция с формой редактирования профиля -
// Создаю экземпляр класса UserInfo, отвечающего за отображение данных профиля
const profile = new UserInfo({userNameSelector: ".profile__name", userJobSelector: ".profile__job"});
// Создаю экземпляр формы для добавления карточки PopupWithForm, колбэк-функция которой
// принимает объект из инпутов формы и на их основе изменяет данные профиля, созданного выше
const profileEditingForm = new PopupWithForm({popupSelector: '.popup_type_profile', handleFormSubmit: (profileData) => {
  profile.setUserInfo(profileData);
  profileEditingForm.close();
  }
});
// Событие открытия формы редактирования профиля
profileEditingButtonElement.addEventListener('click', () => {
  profilePopupNameInput.value = profile.getUserInfo().userName;
  profilePopupJobInput.value = profile.getUserInfo().userJob;
  profileEditingForm.open();
  profileValidation.resetValidation();
})
// Навешиваю слушатели на форму редактирования профиля
profileEditingForm.setEventListeners();

// - Секция с валидацией форм -
// Создание экземпляров валидации для форм добавления карточек и редактирования профиля
const profileValidation = new FormValidator(objForValidation, profileForm);
const placeValidation = new FormValidator(objForValidation, placeForm);
// "Включение" валидации форм
profileValidation.enableValidation();
placeValidation.enableValidation();
