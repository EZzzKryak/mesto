// Доступ к необходимым элементам страницы
const profileEditingButtonElement = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const closePopupButtonElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

// Функция открытия попапа
function openPopup () {
  popupElement.classList.add('popup_opened');
  syncProfileWithInputs();
}

// Функция закрытия попапа
function closePopup () {
    popupElement.classList.remove('popup_opened');
}

// Функция закрытия попапа на оверлей
// function closePopupByClickOnOverlay (event) {
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//     syncProfileWithInputs();
//     closePopup();
// }

// Функция сохранения данных профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;
    closePopup();
}

// Функция синхронизации данных профиля с полями ввода формы
function syncProfileWithInputs () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

// Событие открытия попапа
profileEditingButtonElement.addEventListener('click', openPopup);

// Событие закрытия попапа на крестик
closePopupButtonElement.addEventListener('click', closePopup);

// Событие сохранения данных профиля
formElement.addEventListener('submit', handleFormSubmit);
