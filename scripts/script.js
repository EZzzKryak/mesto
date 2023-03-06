// Доступ к необходимым элементам страницы
const editProfileButtonElement = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const closePopupButtonElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

// Функция закрытия попапа
function closePopup () {
    nameInput.value = document.querySelector('.profile__name').textContent;
    syncProfileWithInputs();
    popupElement.classList.remove('popup_opened');
}

// Функция закрытия попапа на оверлей
function closePopupByClickOnOverlay (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    syncProfileWithInputs();
    closePopup();
}

// Функция сохранения данных профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;

    profileNameElement.textContent = name;
    profileJobElement.textContent = job;

    closePopup();
}

// Функция синхронизации данных профиля с полями ввода формы
function syncProfileWithInputs () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

syncProfileWithInputs();

// Событие открытия попапа
editProfileButtonElement.addEventListener('click', () => {
    popupElement.classList.add('popup_opened');
});

closePopupButtonElement.addEventListener('click', closePopup); // Событие закрытия попапа на крестик
popupElement.addEventListener('click', closePopupByClickOnOverlay); // Событие закрытия попапа на оверлей
formElement.addEventListener('submit', handleFormSubmit);  // Событие сохранения данных профиля
