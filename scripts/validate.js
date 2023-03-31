const popupObjForValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-error_active', // Ошибка в спэне (текст встроенной валидации)
  errorClass: 'popup__input_type_error' // Маркер ошибки в инпуте (красный бордер)
}

// Основная функция валидации, принимающая объект с элементами попапа
function enableValidation(obj) {
  // Создаю массив из коллекции форм в DOM для дальнейшего применения методов массива
  const formElements = Array.from(document.querySelectorAll(obj.formSelector));
  // Перебираю полученную массив
  formElements.forEach((formItem) => {
    formItem.addEventListener('submit', evt => evt.preventDefault());
    // Вызываю функцию с перебором всех инпутов
    setEventListeners(formItem);
  });

  // Функция перебора всех инпутов на странице и установки им обработчиков событий
  function setEventListeners(formItem) {
    // Получаю доступ к кнопке сабмита формы
    const submitButtonElement = formItem.querySelector(obj.submitButtonSelector);
    // Создаю массив из коллекции интупов внутри формы для дальнейшего применения методов массива
    const inputElements = Array.from(formItem.querySelectorAll(obj.inputSelector));
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
  function isValid(formItem, inputItem) {
    if (!inputItem.validity.valid) {
      // showError получает аргументом форму, в которой находится проверяемое поле, и само поле, а также сообщение об ошибке валидации
      showError(formItem, inputItem, inputItem.validationMessage);
    } else {
      // hideError получает аргументом форму, в которой находится проверяемое поле, и само поле
      hideError(formItem, inputItem);
    }
  };

  // Функция, показывающая ошибку валидации
  function showError(formItem, inputItem, errorMessage) {
    // Нахожу элемент ошибки (спэн)
    const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
    // Вывожу ошибку (спэн и бордер инпута)
    inputItem.classList.add(obj.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.inputErrorClass);
  };

  // Функция, скрывающая ошибку валидации
  function hideError(formItem, inputItem) {
    // Нахожу элемент ошибки (спэн)
    const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
    // Скрываю/очищаю ошибку (спэн и бордер инпута)
    inputItem.classList.remove(obj.errorClass);
    errorElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
  };

  // Функция, разрешающая отправку формы (как через кнопку, так и клавишей enter) при отсутствии невалидных инпутов
  function AllowSubmit(inputItems, buttonItem) {
    // Если есть хоть одно невалидное поле
    if (hasInvalidInput(inputItems)) {
      // Запрещаю отправку формы при нажатии на кнопку
      buttonItem.classList.add(obj.inactiveButtonClass);
      // А также при нажатии на клавишу enter, которая ориентируется на состояние кнопки. Если кнопка disabled, то отправка через enter также блокируется.
      inputItems.forEach(inputItem => {
        inputItem.addEventListener('keydown', evt => {
          if(evt.key === 'Enter' && buttonItem.classList.contains(obj.inactiveButtonClass)) {
            evt.preventDefault();
          }
        })
      })
    } else {
      // Разрешаю отправку формы нажатием на кнопку, а следовательно и клавишей enter (т.к. она по умолчанию обладает функцией отправки формы)
      buttonItem.classList.remove(obj.inactiveButtonClass);
    }
  };

  // Функция, проверяющая наличие хоть одного инвалидного инпута. Нужна для связи между валидностью инпутов и возможностью отправки формы.
  function hasInvalidInput(inputItems) {
    // Методом some() проверяю, есть ли невалидные поля. Если хоть одно такое поле найдётся, функция вернёт true.
    return inputItems.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  };
}

// Вызываю функции валидации
enableValidation(popupObjForValidation);
