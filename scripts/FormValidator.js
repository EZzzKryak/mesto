export default class FormValidator {
  constructor(popupConfiguration, formElement) {
    this._inputSelector = popupConfiguration.inputSelector;
    this._submitButtonSelector = popupConfiguration.submitButtonSelector;
    this._inactiveButtonClass = popupConfiguration.inactiveButtonClass;
    this._textErrorClass = popupConfiguration.textErrorClass;
    this._borderErrorClass = popupConfiguration.borderErrorClass;
    this._form = formElement;
  }
  // Методы
  // Основной метод валидации
  enableValidation() {
    // Получаю доступ к кнопке сабмита формы
    this._submitButtonElement = this._form.querySelector(this._submitButtonSelector);
    // Создаю массив из коллекции интупов внутри формы для дальнейшего применения методов массива
    this._inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));
    // Вызываю функцию с перебором всех инпутов
    this._setEventListeners();
  };
  // Перебор всех инпутов на странице и установки им обработчиков событий
  _setEventListeners() {
    // Проверяю изначальное состояние кнопки при загрузке страницы
    this._allowSubmit();
    // Всем интупам формы вешаю обработчик input
    this._inputElements.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        // Проверяю каждый инпут формы на валидность
        this._isValid(inputItem);
        // Разрешаю отправку формы, если все поля валидны (принимает массив инпутов, а также кнопку сабмита)
        this._allowSubmit();
      });
    });
  };
  // Проверка валидности поля формы
  _isValid(inputItem) {
    // Нахожу элемент ошибки (спэн)
    if (!inputItem.validity.valid) {
      // showError получает аргументом форму, в которой находится проверяемое поле, и само поле, а также сообщение об ошибке валидации
      this._showError(inputItem, inputItem.validationMessage);
    } else {
      // hideError получает аргументом форму, в которой находится проверяемое поле, и само поле
      this._hideError(inputItem);
    }
  };
  // Сброс ошибок и кнопки сабмита
  resetValidation() {
    this._disableButton();
    this._inputElements.forEach((inputItem) => {
      this._hideError(inputItem);
    });
  }
  // Запрет отправки формы при наличии пустого инпута
  _disableButton() {
    this._submitButtonElement.setAttribute('disabled', '');
    this._submitButtonElement.classList.add(this._inactiveButtonClass);
  }
  // Вывод ошибки валидации
  _showError(inputItem, errorMessage) {
    // Нахожу элемент ошибки (спэн)
    this._errorElement = this._form.querySelector(`.${inputItem.id}-error`);
    // Вывожу ошибку (спэн и бордер инпута)
    inputItem.classList.add(this._borderErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._textErrorClass);
  };
  // Скрытие ошибки валидации
  _hideError(inputItem) {
    // Нахожу элемент ошибки (спэн)
    this._errorElement = this._form.querySelector(`.${inputItem.id}-error`);
    // Скрываю/очищаю ошибку (спэн и бордер инпута)
    inputItem.classList.remove(this._borderErrorClass);
    this._errorElement.classList.remove(this._textErrorClass);
    this._errorElement.textContent = '';
  };
  // Разрешение на отправку формы при отсутствии невалидных инпутов
  _allowSubmit() {
    // Если есть хоть одно невалидное поле
    if (this._hasInvalidInput()) {
      // Запрещаю отправку формы, добавляя кнопке 'disabled'
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.setAttribute("disabled", '');
    } else {
      // Разрешаю отправку формы
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.removeAttribute("disabled");
    }
  };
    // Проверка на наличие хоть одного инвалидного инпута. Нужна для связи между валидностью инпутов и возможностью отправки формы.
  _hasInvalidInput() {
    // Методом some() проверяю, есть ли невалидные поля. Если хоть одно такое поле найдётся, функция вернёт true.
    return this._inputElements.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  };
}
