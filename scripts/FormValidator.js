export default class FormValidator {
  constructor(popupConfiguration, formElement) {
    // if (!(this instanceof Card)) {
    // throw Error('Error: Incorrect invocation!')
    // }
    this._formSelector = popupConfiguration.formSelector;
    this._inputSelector = popupConfiguration.inputSelector;
    this._submitButtonSelector = popupConfiguration.submitButtonSelector;
    this._inactiveButtonClass = popupConfiguration.inactiveButtonClass;
    this._inputErrorClass = popupConfiguration.inputErrorClass;
    this._errorClass = popupConfiguration.errorClass;
    this._form = formElement;
  }
  // Методы
  // Основная функция валидации
  enableValidation() {
    // Вызываю функцию с перебором всех инпутов
    this.setEventListeners();
  };
  // Функция перебора всех инпутов на странице и установки им обработчиков событий
  setEventListeners() {
    // Получаю доступ к кнопке сабмита формы
    const submitButtonElement = this._form.querySelector(this._submitButtonSelector);
    // Создаю массив из коллекции интупов внутри формы для дальнейшего применения методов массива
    const inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));
    // Проверяю изначальное состояние кнопки при загрузке страницы
    this.AllowSubmit(inputElements, submitButtonElement);
    // Всем интупам формы вешаю обработчик input
    inputElements.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        // Проверяю каждый инпут формы на валидность
        this.isValid(inputItem);
        // Разрешаю отправку формы, если все поля валидны (принимает массив инпутов, а также кнопку сабмита)
        this.AllowSubmit(inputElements, submitButtonElement);
      });
    });
  };

  // Функция проверки валидности поля формы
  isValid(inputItem) {
    if (!inputItem.validity.valid) {
      // showError получает аргументом форму, в которой находится проверяемое поле, и само поле, а также сообщение об ошибке валидации
      this.showError(inputItem, inputItem.validationMessage);
    } else {
      // hideError получает аргументом форму, в которой находится проверяемое поле, и само поле
      this.hideError(inputItem);
    }
  };

  // Функция, показывающая ошибку валидации
  showError(inputItem, errorMessage) {
    // Нахожу элемент ошибки (спэн)
    const errorElement = this._form.querySelector(`.${inputItem.id}-error`);
    // Вывожу ошибку (спэн и бордер инпута)
    inputItem.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorClass);
  };

  // Функция, скрывающая ошибку валидации
  hideError(inputItem) {
    // Нахожу элемент ошибки (спэн)
    const errorElement = this._form.querySelector(`.${inputItem.id}-error`);
    // Скрываю/очищаю ошибку (спэн и бордер инпута)
    inputItem.classList.remove(this._errorClass);
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  // Функция, разрешающая отправку формы при отсутствии невалидных инпутов
  AllowSubmit(inputItems, buttonItem) {
    // Если есть хоть одно невалидное поле
    if (this.hasInvalidInput(inputItems)) {
      // Запрещаю отправку формы, добавляя кнопке 'disabled'
      buttonItem.classList.add(this._inactiveButtonClass);
      buttonItem.setAttribute("disabled", '');
    } else {
      // Разрешаю отправку формы
      buttonItem.classList.remove(this._inactiveButtonClass);
      buttonItem.removeAttribute("disabled");
    }
  };
    // Функция, проверяющая наличие хоть одного инвалидного инпута. Нужна для связи между валидностью инпутов и возможностью отправки формы.
  hasInvalidInput(inputItems) {
    // Методом some() проверяю, есть ли невалидные поля. Если хоть одно такое поле найдётся, функция вернёт true.
    return inputItems.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  };
}
