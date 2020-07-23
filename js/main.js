"use strict";

// Сообзения для комментариев (случайные) (start) //
var MESSAGE = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];
// Сообзения для комментариев (случайные) (end) //
//-//
// Имена авторов (случайные) (start) //
var NAMES = [
  "Аботур",
  "Аврелий",
  "Агафон",
  "Артур",
  "Богдан",
  "Бронислав",
  "Борислав",
  "Василий",
  "Вениамин",
  "Агнес",
  "Алина",
  "Анисия",
  "Бажена",
  "Божена",
  "Беатриса",
  "Валентина",
  "Валерия",
  "Василиса",
];
// Имена авторов (случайные) (end) //
//-//
// ----------- //
var template = document.querySelector("#picture").content;
var fragment = document.createDocumentFragment();
var picturesDifferent = document.querySelector(".pictures");
var bigPicture = document.querySelector(".big-picture");
var socialComments = bigPicture.querySelector(".social__comments");
var socialComment = socialComments.querySelector(".social__comment");
var body = document.querySelector("body");

var getValueInterval = function (min, max) { // Чтобы включалось и минимальное, и максимальное значение в заданном интервале.
  min = Math.ceil(min); // Метод Math.ceil() округление вверх. Округляет аргумент до ближайшего большего целого.
  max = Math.floor(max); // возвращение целого числоа, которое <= числу.
  return Math.floor(Math.random() * (max - min)) + min;
};
// ----------- //
//-//
// Данные авторов (случайные) (start) //
var getAmountObjectComment = function (count) {
  var comments = [];
  for (var i = 0; i < count; i++) {
    var comment = {
      avatar: "img/avatar-" + getValueInterval(1, 7) + ".svg",
      message: MESSAGE[getValueInterval(0, MESSAGE.length)],
      name: NAMES[getValueInterval(0, NAMES.length)],
    };
    comments.push(comment);
  }
  return comments;
};
// Данные авторов (случайные) (end) //
//-//
// Функция для создания массива из 25 сгенерированных JS-объектов (start) //
var makeInfoPhotos = function () {
  var contents = [];
  for (var i = 0; i < 25; i++) {
    var infoPhotos = {
      url: "photos/" + (i + 1) + ".jpg", // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25
      // url: "photos/" + (i + 1) + ".jpg", // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25
      description: "Описание фотографии", // строка — описание фотографии
      likes: getValueInterval(15, 200), // число — количество лайков, поставленных фотографии. Случайное число от 15 до 200
      comments: getAmountObjectComment(getValueInterval(1, 6)),
    };
    contents.push(infoPhotos);
  }
  return contents;
};
// Функция для создания массива из 25 сгенерированных JS-объектов (end) //
//-//
// Отрисовка сгенерированных DOM-элементов (start) //
var renderElements = function (picture) {
  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector(".picture__img").src = picture.url;
  pictureElement.querySelector(".picture__likes").textContent = picture.likes;
  pictureElement.querySelector(".picture__comments").textContent = picture.comments.length;

  return pictureElement;
};

var addElement = function (renderWay, elementType, block) {
  for (var i = 0; i < elementType.length; i++) {
    fragment.appendChild(renderWay(elementType[i]));
  }
  block.appendChild(fragment);
};
// Отрисовка сгенерированных DOM-элементов (end) //
//-//
// Добавление данных в блок с фото и комментариями (start) //
var addInfoInBigPictureComments = function (bigPictureComment) {
  var commentElement = socialComment.cloneNode(true);

  commentElement.querySelector(".social__picture").src = bigPictureComment.avatar;
  commentElement.querySelector(".social__picture").alt = bigPictureComment.name;
  commentElement.querySelector(".social__text").textContent = bigPictureComment.message;

  return commentElement;
};

var InfoBigPicture = function (pictureInfo) {
  // bigPicture.classList.remove("hidden");
  bigPicture.querySelector(".big-picture__img img").src = pictureInfo.url;
  bigPicture.querySelector(".big-picture__img img").alt = pictureInfo.name;
  bigPicture.querySelector(".likes-count").textContent = pictureInfo.likes;
  bigPicture.querySelector(".comments-count").textContent = pictureInfo.comments.length;
  bigPicture.querySelector(".social__comments").src = pictureInfo.commentDifferent;
  bigPicture.querySelector(".social__caption").textContent = pictureInfo.description;
  bigPicture.querySelector(".social__comment-count").classList.add("hidden");
  bigPicture.querySelector(".comments-loader").classList.add("hidden");
  body.classList.add("modal-open");
  addElement(addInfoInBigPictureComments, bigPictureComments, socialComments, getAmountObjectComment);

  return bigPicture;
};

var pictures = makeInfoPhotos(25);
var bigPictureComments = pictures[0].comments;
addElement(renderElements, pictures, picturesDifferent);
InfoBigPicture(pictures[0]);
// Добавление данных в блок с фото и комментариями (end) //

var ESC_CODE = 'Escape';
var ENTER_CODE = 'Enter';

// Открытие и закрытие модального окна с описанием фотографии (start) //
var openPicture = document.querySelector('.picture');
var closeWindowPicComments = bigPicture.querySelector('.big-picture__cancel');

var goWindowPicComments = function () {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', OnWindowPicCommentsEsc);
};

var OnWindowPicCommentsEsc = function (evt) {
  if (evt.key === ESC_CODE) {
    evt.preventDefault();
    goWindowPicComments();
  }
};

var openWindowPicComments = function () {
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', OnWindowPicCommentsEsc);
};

openPicture.addEventListener('click', function () {
  openWindowPicComments();
});

openPicture.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_CODE) {
    openWindowPicComments();
  }
});

closeWindowPicComments.addEventListener('click', function () {
  goWindowPicComments();
});

closeWindowPicComments.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_CODE) {
    goWindowPicComments();
  }
});
// Открытие и закрытие модального окна с описанием фотографии (end) //
//-//
// Открытие и закрытие формы загрузки фото (start) //
var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('#upload-file');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
// Открытие и закрытие формы загрузки фото //
//-//
// Открытие окна редактирования фото. Событие изменения значения поля (start).//
var scaleControlValue = imgUpload.querySelector('.scale__control--value');

uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  openImgUploadFile(imgUploadOverlay);
  scaleControlValue.value = '100%';

  imgUploadOverlay.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  scaleControlValue.value = '100%';
  addAllEventListeners(); // Добавлене всех обработчиков событий
});
// Открытие окна редактирования фото. Событие изменения значения поля (end).//
//-//
// Открытие и закрытие модального окна загрузки фото (start) //
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var effectsLabel = imgUploadOverlay.querySelector('.effects__label');
var imUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
var effectsPreview = imgUploadOverlay.querySelector('.effects__preview');
var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
var textDescription = imgUploadOverlay.querySelector('.text__description');
var imgUploadSubmit = imgUploadOverlay.querySelector('.img-upload__submit');

var removeEventListenerClose = function () {
  evt.preventDefault();
  document.removeEventListener('keydown', closeImgUploadFile);
};

var removeEventListenerOpen = function () {
  evt.preventDefault();
  document.removeEventListener('keydown', openImgUploadFile);
};

var closeImgUploadFile = function () {
  imgUploadOverlay.classList.add('hidden');
};

var openImgUploadFile = function () {
  imgUploadOverlay.classList.remove('hidden');
};

imgUploadCancel.addEventListener('click', function () {
  openImgUploadFile();
});

imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_CODE) {
    openImgUploadFile();
  }
});

imgUploadCancel.addEventListener('click', function () {
  closeImgUploadFile();
});

imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_CODE) {
    closeImgUploadFile();
  }
});

imgUploadOverlay.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    closeImgUploadFile();
  }
});

imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    closeImgUploadFile();
  }
});

imUploadScale.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    closeImgUploadFile();
  }
});

effectsPreview.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    closeImgUploadFile();
  }
});

textHashtags.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    closeImgUploadFile();
  }
});

imgUploadSubmit.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    closeImgUploadFile();
  }
});

imgUploadOverlay.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    closeImgUploadFile();
  }
});

imgUpload.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_CODE) {
    closeImgUploadFile();
  }
});
// Открытие и закрытие модального окна загрузки фото (end) //
//-//
// Движение ползанка слвайдера влево и вправо (start) //
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelDepth = document.querySelector('.effect-level__depth');

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var levelLine = effectLevelLine.getBoundingClientRect();
  var startCoordsX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;

    if (moveEvt.clientX <= levelLine.left) {
      effectLevelPin.style.left = '0%';
      effectLevelDepth.style.width = '0%';
    }

    if (moveEvt.clientX >= levelLine.right) {
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
    } else {
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
      effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift) / (levelLine.right - levelLine.left) * 100 + '%';
    }
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
// Движение ползанка слвайдера влево и вправо (end) //
//-//
// Обработчик уменьшения фотографии в окне загрузки фотографии (start) //
var imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
var imgUploadScale = document.querySelector('.img-upload__scale');
var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
var scaleControlValue = document.querySelector('.scale__control--value');

var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var SCALE_STEP = 25;

scaleControlSmaller.addEventListener('click', function () {
  var scaleValue = Number(scaleControlValue.value.slice(0, -1));
  scaleValue -= SCALE_STEP;

  if (scaleValue <= MIN_SCALE_VALUE) {
    scaleValue = MIN_SCALE_VALUE;
  }

  changeImgScale(scaleValue);
});
// Обработчик уменьшения фотографии в окне загрузки фотографии (end) //
//-//
// Обработчик увеличения фотографии в окне загрузки фотографии (start) //
scaleControlBigger.addEventListener('click', function () {
  var scaleValue = Number(scaleControlValue.value.slice(0, -1));
  scaleValue += SCALE_STEP;

  if (scaleValue > MAX_SCALE_VALUE) {
    scaleValue = MAX_SCALE_VALUE;
  }

  changeImgScale(scaleValue);
});
// Обработчик увеличения фотографии в окне загрузки фотографии (end) //
//-//
// Функция изменения масштаба фотографии в окне загрузки фотографии (start) //
function changeImgScale(value) {
  scaleControlValue.value = value + '%';
  imgUploadPreviewImg.style.transform = 'scale(' + (value / 100) + ')';
}
// Функция изменения масштаба фотографии в окне загрузки фотографии (end) //
//-//
// Применение эффекта для изображения (start) //
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

// Эффекты для загруженного изображения
var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
var loadedImage = imgUploadPreview.children[0];
var effectLevel = imgUpload.querySelector('.effect-level');
var effectsRadio = document.querySelectorAll('.effects__radio');
var selectedItem;
var filters = {
  none: {
    class: 'effects__preview--none',
    style: 'none'
  },

  chrome: {
    class: 'effects__preview--chrome',
    style: 'grayscale',
    max: 1,
    min: 0
  },

  sepia: {
    class: 'effects__preview--sepia',
    style: 'sepia',
    max: 1,
    min: 0
  },

  marvin: {
    class: 'effects__preview--marvin',
    style: 'invert',
    max: 100,
    min: 0,
    postFix: '%'
  },

  phobos: {
    class: 'effects__preview--phobos',
    style: 'blur',
    max: 3,
    min: 0,
    postFix: 'px'
  },

  heat: {
    class: 'effects__preview--heat',
    style: 'brightness',
    max: 3,
    min: 1
  }
};

// Если фильтр 'Оригинал', ползунок исчезает
var checkFilter = function (selectedValue) {
  return selectedValue !== 'none' ? effectLevel.classList.remove('hidden') : effectLevel.classList.add('hidden');
};

// Регулирование глубины эффекта
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var PIN_POSITION_MAX = 453;

// Функция рассчитывает позицию ползунка и применяет фильтр
var getPosition = function (evt) {
  // Считывается позиция относительно effectLevelLine
  var pinCoords = evt.clientX;
  var shift = pinCoords - effectLevelLine.getBoundingClientRect().left;

  // Рассчитываем пропорцию, чтобы понять, какой уровень эффекта нужно применить
  var position = shift / PIN_POSITION_MAX;

  // Применение глубины фильтра пропорционально позиции ползунка
  addFilterImgLevel(filters[selectedItem].min, filters[selectedItem].max, filters[selectedItem].style, position, filters[selectedItem].postFix);
};

// Функция рассчета глубины фильтра //
var addFilterImgLevel = function (minFilterValue, maxFilterValue, styleName, positionValue, postFix) {
  var filterPostfix = postFix || '';
  var filterValue = (maxFilterValue - minFilterValue) * positionValue + minFilterValue;
  var filterStyle = styleName !== 'none' ? styleName + '(' + filterValue + filterPostfix + ')' : styleName;
  loadedImage.style.filter = filterStyle;
};

// добавление фильтра на загруженное изображение
var addFilterImg = function (selectedValue) {
  loadedImage.classList.add(filters[selectedValue].class);
  addFilterImgLevel(filters[selectedValue].min, filters[selectedValue].max, filters[selectedValue].style, 1, filters[selectedValue].postFix);
};

// Проверка количества классов на элементе и добавление фильтров
var checkClass = function (evt) {
  selectedItem = evt.target.value;
  if (loadedImage.classList.length === 2) {
    loadedImage.classList.remove(loadedImage.classList[1]);
    checkFilter(selectedItem);
    addFilterImg(selectedItem);
  } else {
    checkFilter(selectedItem);
    addFilterImg(selectedItem);
  }
};
// Применение эффекта для изображения (end) //
//-//
// обработчики соытий (start) //
// Добавлене всех обработчиков событий
var addAllEventListeners = function () {
  // 'mouseup' на ползунке слайдера
  effectLevelPin.addEventListener('mouseup', getPosition);

  // Добавление обработчика события радио кнопкам
  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', checkClass);
  }
};

// Удаление всех обработчиков событий
var removeAllEventListeners = function () {
  // 'mouseup' на ползунке слайдера
  effectLevelPin.removeEventListener('mouseup', getPosition);

  // клик по кнопке "-"
  scaleControlSmaller.removeEventListener('click', rediceSzePicture);

  // клик по кнопке "+"
  scaleControlBigger.removeEventListener('click', increaseSizePicture);

  // Удаление обработчика события радио кнопкам
  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].removeEventListener('click', checkClass);
  }
};

// Сбрасывает значение поля выбора файла
var restoreDefault = function () {
  loadedImage.style.transform = 'scale(1)';
  if (loadedImage.classList.length === 1) {
    loadedImage.classList.remove(loadedImage.classList[0]);
  }
  loadedImage.style.filter = 'none';
};
// обработчики соытий (end) //
//-//
// Валидация хеш-тегов (start) //

var textHashtags = document.querySelector('.text__hashtags');
var MAX_SYMBOLS = 20;
var HASHTAG_COUNT = 5;
var SYMBOL = /#[А-Яа-яA-Za-z0-9]*$/;

var hashtagsValidity = function () {
  // переменая, содержащая лину ъэш тега
  var hashtagInputError = textHashtags.value;
  // ъэг тег в нижнем регистре
  var lowerCaseHashtag = hashtagInputError.toLowerCase();
  // массив ъэштегов с пробелом
  var hashtagArr = lowerCaseHashtag.split(' ');
  // очистка поля ошибки, если не хэш тега\ов
  if (textHashtags.value.length === 0) {
    textHashtags.setCustomValidity('');
  } else if (hashtagArr.length > HASHTAG_COUNT) {
    textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  } else {
    for (var i = 0; i < hashtagArr.length; i++) {
      if (hashtagArr[i][0] !== '#' || hashtagArr[0][0] !== '#') {
        textHashtags.setCustomValidity('хеш-тег начинается с #');
      } else if (hashtagArr[i] === '#') {
        textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (hashtagArr.indexOf(hashtagArr[i]) !== i) {
        textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды, хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;');
      } else if (hashtagArr[i].length > MAX_SYMBOLS) {
        textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (hashtagArr[i].split('#').length > 2) {
        textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
      } else if (!SYMBOL.test(textHashtags.value)) {
        textHashtags.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д');
      } else {
        textHashtags.setCustomValidity('');
      }
    }
  }
};

textHashtags.addEventListener('input', hashtagsValidity);
// Валидация хеш-тегов (end) //
