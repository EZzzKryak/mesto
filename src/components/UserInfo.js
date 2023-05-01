

export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._profileNameEl = document.querySelector('.profile__name');
    this._profileJobEl = document.querySelector('.profile__job');
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
  }

  setUserInfo(name, job) {
    // Сохранение данных профиля
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}
