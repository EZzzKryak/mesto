export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }
  // Метод возвращает объект с данными профиля (для отображения в форме при её открытии)
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
  }

  // Метод устанавливает данные профиля при сабмите формы
  setUserInfo(profileData) {
    this._userName.textContent = profileData.profileName;
    this._userJob.textContent = profileData.profileJob;
  }
}
