export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userNameEl = document.querySelector(userNameSelector);
    this._userJobEl = document.querySelector(userJobSelector);
    this._userAvatarEl = document.querySelector(userAvatarSelector);
  }
  // Метод возвращает объект с данными профиля
  getUserInfo() {
    return {
      name: this._userNameEl.textContent,
      about: this._userJobEl.textContent,
    }
  }

  // Метод устанавливает данные профиля из формы
  setUserInfo(formData) {
    this._userNameEl.textContent = formData.name;
    this._userJobEl.textContent = formData.about;
  }

  // Метод устанавливает аватар пользователя из формы
  setUserAvatar(formData) {
    this._userAvatarEl.src = formData.avatar;
  }
}
