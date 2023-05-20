import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  avatarForm,
  avatarUpdatingElement,
  objForValidation,
  placeAdditingButtonElement,
  placeForm,
  profileEditingButtonElement,
  profileForm,
  profilePopupJobInput,
  profilePopupNameInput
} from '../utils/constants.js';
import './index.css';

// Переменная для записи в неё айдишника пользователя
let myId;

// - Секция с созданием классов -
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-66', '3e88d293-6aa5-4be1-80b0-20488c557b9e');
const profile = new UserInfo(".profile__name", ".profile__job", ".profile__avatar");
const cardImagePopup = new PopupWithImage('.popup_type_img');
const confirmPopup = new PopupWithConfirmation('.popup_type_confirm');
const cardList = new Section((cardData) => {
  const cardElement = createCard(cardData);
  cardList.addItemAppend(cardElement);
}, '.places');
const profileEditingPopup = new PopupWithForm('.popup_type_profile', (profileData) => {
  profileEditingPopup.isLoading(true);
  api.setProfileInfo(profileData)
    .then(res => {
      profile.setUserInfo(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    profileEditingPopup.isLoading(false);
  });
    profileEditingPopup.close();
  }
);
const avatarUpdatingPopup = new PopupWithForm('.popup_type_avatar', (avatarData) => {
  avatarUpdatingPopup.isLoading(true);
  api.setProfileAvatar(avatarData)
    .then(res => {
      profile.setUserAvatar(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarUpdatingPopup.isLoading(false);
    });
    avatarUpdatingPopup.close();
  }
);
const placeAdditingPopup = new PopupWithForm('.popup_type_place', (cardData) => {
  placeAdditingPopup.isLoading(true);
  api.postNewCard(cardData)
    .then(res => {
      const cardElement = createCard(res);
      cardList.addItemPrepend(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      placeAdditingPopup.isLoading(false);
    });
    placeAdditingPopup.close();
  }
);
// Фабрика по созданию карточек
function createCard(cardItem) {
  const card = new Card(
    cardItem,
    '#place',
    myId,
    (evt) => {
    cardImagePopup.open(evt);
  }, () => {
    confirmPopup.open();
    confirmPopup.handleAction(() => {
      api.deleteCard(cardItem._id)
      .then(() => {
        card.handleRemoveCard();
      })
      .catch((err) => {
        console.log(err);
      });
      confirmPopup.close();
    })
  }, () => {
    api.setLike(cardItem._id)
      .then(res => {
        card.handleLikeClick(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }, () => {
      api.removeLike(cardItem._id)
      .then(res => {
        card.handleLikeClick(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  )
  const cardElement = card.generateCard();
  return cardElement;
}

// Рендер элементов страницы после получения информации о карточках и пользователе
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileData, cardsData]) => {
    // Айдишник пользователя из запроса записывается в myId (используется при создании карточек)
    myId = profileData._id;
    cardList.renderItems(cardsData);
    profile.setUserInfo(profileData);
    profile.setUserAvatar(profileData);
  })
  .catch((err) => {
    console.log(err);
  });

// - Секция с валидацией форм -
// Создание экземпляров валидации для форм добавления карточек и редактирования профиля
const profileValidation = new FormValidator(objForValidation, profileForm);
const placeValidation = new FormValidator(objForValidation, placeForm);
const avatarValidation = new FormValidator(objForValidation, avatarForm);
// "Включение" валидации форм
profileValidation.enableValidation();
placeValidation.enableValidation();
avatarValidation.enableValidation();

// - Секция с обработчиками событий -
// Открытие формы добавления новой карточки
placeAdditingButtonElement.addEventListener('click', () => {
  placeAdditingPopup.open();
  placeValidation.resetValidation();
});
// Открытие формы редактирования профиля
profileEditingButtonElement.addEventListener('click', () => {
  profilePopupNameInput.value = profile.getUserInfo().name;
  profilePopupJobInput.value = profile.getUserInfo().about;
  profileEditingPopup.open();
  profileValidation.resetValidation();
})
// Открытие формы редактирования аватара профиля
avatarUpdatingElement.addEventListener('click', () => {
  avatarUpdatingPopup.open();
  avatarValidation.resetValidation();
})

// Навешивание слушателей на формы (попапы)
avatarUpdatingPopup.setEventListeners();
profileEditingPopup.setEventListeners();
confirmPopup.setEventListeners();
placeAdditingPopup.setEventListeners();
cardImagePopup.setEventListeners();
