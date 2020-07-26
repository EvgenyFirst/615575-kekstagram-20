'use strict';

var goValidationCommentsLoadedPhoto = function () {
  // Валидация поля для комментария с загруженными фото (start) //
  var bigPicture = document.querySelector(".big-picture");
  var textDescriptionAdd = bigPicture.querySelector('.social__footer-text');

  var MAX_SYMBOLS_DESC_ADD = 140;

  var gotextDescriptionAdd = function () {
    // переменая, содержащая лину ъэш тега
    var descInputErrorAdd = textDescriptionAdd.value;
    // ъэг тег в нижнем регистре
    var lowerCaseDescAdd = descInputErrorAdd.toLowerCase();
    // массив ъэштегов с пробелом
    var descgArrAdd = lowerCaseDescAdd.split(' ');
    for (var i = 0; i < descgArrAdd.length; i++) {
      if (descgArrAdd[i].length > MAX_SYMBOLS_DESC_ADD) {
        textDescriptionAdd.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      } else {
        textDescriptionAdd.setCustomValidity('');
      }
    }
  };

  textDescriptionAdd.addEventListener('input', gotextDescriptionAdd);

  textDescriptionAdd.addEventListener('keydown', function (evt) { // если поле комментария в фокусе, то при нажатии кнопки Esc Оно не закроется
    if (evt.key === ESC_CODE) {
      evt.stopPropagation();
    }
  });
  // Валидация поля для комментария с загруженными фото (end) //
};

goValidationCommentsLoadedPhoto();
