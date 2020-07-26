'use strict';

var goValidationCommentsLoadPhoto = function () {
  // Валидация поля для комментария где загружаются редактируется фото фильтрами (start) //
  var MAX_SYMBOLS_DESC = 140;

  var imgUpload = document.querySelector('.img-upload');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var textDescription = imgUploadOverlay.querySelector('.text__description');

  var gotextDescription = function () {
    // переменая, содержащая лину ъэш тега
    var descInputError = textDescription.value;
    // ъэг тег в нижнем регистре
    var lowerCaseDesc = descInputError.toLowerCase();
    // массив ъэштегов с пробелом
    var descgArr = lowerCaseDesc.split(' ');
    for (var i = 0; i < descgArr.length; i++) {
      if (descgArr[i].length > MAX_SYMBOLS_DESC) {
        textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      } else {
        textDescription.setCustomValidity('');
      }
    }
  };

  textDescription.addEventListener('input', gotextDescription);
  // Валидация поля для комментария где загружаются редактируется фото фильтрами (end) //
};

goValidationCommentsLoadPhoto();
