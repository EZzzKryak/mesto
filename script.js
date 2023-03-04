// Доступ к необходимым элементам страницы
const editProfileButtonElement = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const closePopupButtonElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__job');

// Функция закрытия попапа
function closePopup () {
    popupElement.classList.remove('popup_opened');
}

// Функция закрытия попапа на оверлей
function closePopupByClickOnOverlay (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
}

// Функция сохранения данных профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;

    const profileNameElement = document.querySelector('.profile__name');
    const profileJobElement = document.querySelector('.profile__job');

    profileNameElement.textContent = name;
    profileJobElement.textContent = job;

    closePopup();
}

// Событие открытия попапа
editProfileButtonElement.addEventListener('click', () => {
    popupElement.classList.add('popup_opened');
});

closePopupButtonElement.addEventListener('click', closePopup); // Событие закрытия попапа на крестик
popupElement.addEventListener('click', closePopupByClickOnOverlay); // Событие закрытия попапа на оверлей
formElement.addEventListener('submit', handleFormSubmit);  // Событие сохранения данных профиля
