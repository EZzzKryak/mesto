const popupObjForValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-error_active', // Ошибка в спэне (текст встроенной валидации)
  errorClass: 'popup__input_type_error' // Маркер ошибки в инпуте (красный бордер)
}

class FormValidator {
  constructor(data, form) {
    this.data = data;
    this.form = form;
  }
  // Основная функция валидации, принимающая объект с элементами попапа
  enableValidation(data) {
    // Создаю массив из коллекции форм в DOM для дальнейшего применения методов массива
    const formElements = Array.from(document.querySelectorAll(data.formSelector));
    // Перебираю полученную массив
    formElements.forEach((formItem) => {
      formItem.addEventListener('submit', evt => evt.preventDefault());
      // Вызываю функцию с перебором всех инпутов
      setEventListeners(formItem);
    });

    // Функция перебора всех инпутов на странице и установки им обработчиков событий
    setEventListeners(formItem) {
      // Получаю доступ к кнопке сабмита формы
      const submitButtonElement = formItem.querySelector(data.submitButtonSelector);
      // Создаю массив из коллекции интупов внутри формы для дальнейшего применения методов массива
      const inputElements = Array.from(formItem.querySelectorAll(data.inputSelector));
      // Проверяю изначальное состояние кнопки при загрузке страницы
      AllowSubmit(inputElements, submitButtonElement);
      // Всем интупам формы вешаю обработчик input
      inputElements.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
          // Проверяю каждый инпут формы на валидность
          isValid(formItem, inputItem);
          // Разрешаю отправку формы, если все поля валидны (принимает массив инпутов, а также кнопку сабмита)
          AllowSubmit(inputElements, submitButtonElement);
        });
      });
    };

    // Функция проверки валидности поля формы
    isValid(formItem, inputItem) {
      if (!inputItem.validity.valid) {
        // showError получает аргументом форму, в которой находится проверяемое поле, и само поле, а также сообщение об ошибке валидации
        showError(formItem, inputItem, inputItem.validationMessage);
      } else {
        // hideError получает аргументом форму, в которой находится проверяемое поле, и само поле
        hideError(formItem, inputItem);
      }
    };

    // Функция, показывающая ошибку валидации
    showError(formItem, inputItem, errorMessage) {
      // Нахожу элемент ошибки (спэн)
      const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
      // Вывожу ошибку (спэн и бордер инпута)
      inputItem.classList.add(data.errorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(data.inputErrorClass);
    };

    // Функция, скрывающая ошибку валидации
    hideError(formItem, inputItem) {
      // Нахожу элемент ошибки (спэн)
      const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
      // Скрываю/очищаю ошибку (спэн и бордер инпута)
      inputItem.classList.remove(data.errorClass);
      errorElement.classList.remove(data.inputErrorClass);
      errorElement.textContent = '';
    };

    // Функция, разрешающая отправку формы при отсутствии невалидных инпутов
    AllowSubmit(inputItems, buttonItem) {
      // Если есть хоть одно невалидное поле
      if (hasInvalidInput(inputItems)) {
        // Запрещаю отправку формы, добавляя кнопке 'disabled'
        buttonItem.classList.add(data.inactiveButtonClass);
        buttonItem.setAttribute("disabled", '');
      } else {
        // Разрешаю отправку формы
        buttonItem.classList.remove(data.inactiveButtonClass);
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
}

const formElements = document.querySelectorAll('.form__popup');

formElements.map(form => {
  new FormValidator(popupObjForValidation, form);
})


// Вызываю функции валидации
// enableValidation(popupObjForValidation);
