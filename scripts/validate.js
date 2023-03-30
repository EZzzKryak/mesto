const popupObjForValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-error_active', // Ошибка в спэне
  errorClass: 'popup__input_type_error' // Маркер ошибки в инпуте (красный бордер)
}


// Функция валидации, принимающая объект с элементами попапа
function enableValidation(obj) {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formElements = Array.from(document.querySelectorAll(obj.formSelector));
  // Переберём полученную коллекцию
  formElements.forEach((formItem) => {

    // Отменим стандартное поведение браузера при отправке формы для каждоый формы
    formItem.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners, которая переберёт все инпуты внутри формы
    setEventListeners(formItem);
  });

  // Функция установки обработчиков событий для всех инпутов форм на странице
  function setEventListeners(formItem) {
    // Получаем доступ к кнопке
    const submitButtonElement = formItem.querySelector(obj.submitButtonSelector);
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputElements = Array.from(formItem.querySelectorAll(obj.inputSelector));
    // Проверяем изначальное состояние кнопки при загрузке страницы
    AllowSubmit(inputElements, submitButtonElement);
    // Обойдём все элементы полученной коллекции
    inputElements.forEach((inputItem) => {
      // Каждому полю добавим обработчик события input
      inputItem.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        isValid(formItem, inputItem);
        // Функция разрешения отправки формы, если все поля валидны
        AllowSubmit(inputElements, submitButtonElement); //--------------------------------------------------------------- ДОРАБОТАТЬ!!!!
      });
    });
  };

  // Функция проверки валидности поля формы
  function isValid(formItem, inputItem) {
    if (!inputItem.validity.valid) {
      // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
      showError(formItem, inputItem, inputItem.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
      hideError(formItem, inputItem);
    }
  };

  function showError(formItem, inputItem, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formItem.querySelector(`.${inputItem.id}-error`);  // Спэн с ошибкой
    // Остальной код такой же
    inputItem.classList.add(obj.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.inputErrorClass);
  };

  function hideError(formItem, inputItem) {
    // Находим элемент ошибки
    const errorElement = formItem.querySelector(`.${inputItem.id}-error`);  // Спэн с ошибкой
    // Остальной код такой же
    inputItem.classList.remove(obj.errorClass);
    errorElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
  };

  function AllowSubmit(inputItems, buttonItem) {  //--------------------------------------------------------------- ДОРАБОТАТЬ!!!!
    if (hasInvalidInput(inputItems)) {
      buttonItem.classList.add(obj.inactiveButtonClass);
    } else {
      buttonItem.classList.remove(obj.inactiveButtonClass);
    }
  };

  function hasInvalidInput(inputItems) {
    // проходим по этому массиву методом some
    return inputItems.some((inputItem) => {
      // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true
      return !inputItem.validity.valid;
    })
  };
}

// Вызов функции валидации
enableValidation(popupObjForValidation);
