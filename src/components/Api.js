import { handleRequest } from "../utils/utils";

export default class Api {
  constructor(baseUrl, token) {
    this._url = baseUrl;
    this._token = token;
  }

  // Возвращает промис для получения первоначальных карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      }
    })
      .then(handleRequest);
  }

  // Возвращает промис для добавления новой карточки
  postNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(handleRequest);
  }

  // Возвращает промис для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      }
    })
      .then(handleRequest);
  }

  // Возвращает промис для первоначального получения данных профиля с сервера (имени, описания и аватара)
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      }
    })
      .then(handleRequest);
  }

  // Возвращает промис для установки новых данных профиля из формы
  setProfileInfo(profileData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profileData.profileName,
        about: profileData.profileJob
      })
    })
      .then(handleRequest);
  }

  // Возвращает промис для установки нового аватара профиля
  setProfileAvatar(avatarData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarData.avatarLink
      })
    })
      .then(handleRequest);
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      }
    })
      .then(handleRequest);
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      }
    })
      .then(handleRequest);
    }
}
