// Массив карточек, которые изначально рендерятся на странице
export const initialCards = [
  {
    cardName: 'Архыз',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    cardName: 'Челябинская область',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    cardName: 'Иваново',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    cardName: 'Камчатка',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    cardName: 'Холмогорский район',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    cardName: 'Байкал',
    cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Объект настроек валидации форм
export const objForValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  textErrorClass: 'popup__input-error_active', // Ошибка в спэне (текст встроенной валидации)
  borderErrorClass: 'popup__input_type_error' // Маркер ошибки в инпуте (красный бордер)
}

// Получение форм со страницы
export const profileForm = document.querySelector('.popup__form_type_profile');
export const placeForm = document.querySelector('.popup__form_type_place');
export const avatarForm = document.querySelector('.popup__form_type_avatar');
// Получение кнопок открытия попапов
export const profileEditingButtonElement = document.querySelector('.profile__edit-btn');
export const placeAdditingButtonElement = document.querySelector('.profile__add-btn');
export const avatarUpdatingElement = document.querySelector('.profile__avatar-container');
// Получение инпутов формы профиля
export const profilePopupNameInput = profileForm.querySelector('.popup__input_type_name');
export const profilePopupJobInput = profileForm.querySelector('.popup__input_type_job');
