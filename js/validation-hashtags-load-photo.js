/* eslint-disable no-undef */
'use strict';

var goValidationHashtagsLoadPhoto = function () {
  // Валидация хеш-тегов (start) //
  var textsHashtags = document.querySelector('.text__hashtags');
  var MAX_SYMBOLS = 20;
  var HASHTAG_COUNT = 5;
  var SYMBOL = /#[А-Яа-яA-Za-z0-9]*$/;

  var goHashtagsValidity = function () {
    // переменая, содержащая лину ъэш тега
    var hashtagInputError = textsHashtags.value;
    // ъэг тег в нижнем регистре
    var lowerCaseHashtag = hashtagInputError.toLowerCase();
    // массив ъэштегов с пробелом
    var hashtagArr = lowerCaseHashtag.split(' ');
    // очистка поля ошибки, если не хэш тега\ов
    if (textsHashtags.value.length === 0) {
      textsHashtags.setCustomValidity('');
    } else if (hashtagArr.length > HASHTAG_COUNT) {
      textsHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else {
      for (var i = 0; i < hashtagArr.length; i++) {
        if (hashtagArr[i][0] !== '#' || hashtagArr[0][0] !== '#') {
          textsHashtags.setCustomValidity('хеш-тег начинается с #');
        } else if (hashtagArr[i] === '#') {
          textsHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (hashtagArr.indexOf(hashtagArr[i]) !== i) {
          textsHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды, хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;');
        } else if (hashtagArr[i].length > MAX_SYMBOLS) {
          textsHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (hashtagArr[i].split('#').length > 2) {
          textsHashtags.setCustomValidity('хэш-теги разделяются пробелами');
        } else if (!SYMBOL.test(textsHashtags.value)) {
          textsHashtags.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д');
        } else {
          textsHashtags.setCustomValidity('');
        }
      }
    }
  };

    // eslint-disable-next-line no-undef
  textHashtags.addEventListener('input', goHashtagsValidity);
// Валидация хеш-тегов (end) //
};

goValidationHashtagsLoadPhoto();
