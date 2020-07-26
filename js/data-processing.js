"use strict";

var ESC_CODE = 'Escape';
var ENTER_CODE = 'Enter';

// Открытие и закрытие модального окна с описанием фотографии (start) //
var openPicture = document.querySelector('.picture');
var bigPicture = document.querySelector(".big-picture");
var closeWindowPicComments = bigPicture.querySelector('.big-picture__cancel');
var picturesDifferent = document.querySelector(".pictures");

var elements = document.getElementsByClassName("picture");
for (var i = 0; i < elements.length; i++) {
  elements[i].setAttribute("onclick", "show()");
  elements[i].addEventListener('click', function () {
    openWindowPicComments();
  });
}

function show() {
  picturesDifferent.querySelector('.picture').classList.remove('hidden');
}
show();

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

//openPicture.addEventListener('click', function () {
//  openWindowPicComments();
//});

openPicture.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_CODE) {
    openWindowPicComments();
  }
});
closeWindowPicComments.addEventListener('click', function () {
  goWindowPicComments();
});

/*closeWindowPicComments.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_CODE) {
    goWindowPicComments();
  }
});*/
closeWindowPicComments.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, goWindowPicComments());
});
// Открытие и закрытие модального окна с описанием фотографии (end) //
//-//
// Открытие и закрытие формы загрузки фото (start) //
var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('#upload-file');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
// Открытие и закрытие формы загрузки фото //
//-//
// Открытие окна редактирования фото. Событие изменения значения поля (start).//

uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  openImgUploadFile(imgUploadOverlay);

  imgUploadOverlay.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  scaleControlValue.value = '100%';
  addAllEventListeners(); // Добавлене всех обработчиков событий
  removeEventListenerOpen();
  removeEventListenerClose();
});
// Открытие окна редактирования фото. Событие изменения значения поля (end).//
//-//
// Открытие и закрытие модального окна загрузки фото (start) //
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var imgUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
var effectsPreview = imgUploadOverlay.querySelector('.effects__preview');
var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
var textDescription = imgUploadOverlay.querySelector('.text__description');
var imgUploadSubmit = imgUploadOverlay.querySelector('.img-upload__submit');

var removeEventListenerClose = function () {
  document.removeEventListener('keydown', closeImgUploadFile);
};

var removeEventListenerOpen = function () {
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

imgUploadScale.addEventListener('keydown', function (evt) {
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
    evt.stopPropagation();
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
// Движение ползунка слвайдера влево и вправо (start) //
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
// Движение ползунка слвайдера влево и вправо (end) //
//-//
// Обработчик уменьшения фотографии в окне загрузки фотографии (start) //
var imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
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

  removeAllEventListeners();
}
// Функция изменения масштаба фотографии в окне загрузки фотографии (end) //
//-//
// Применение эффекта для изображения (start) //

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
// обработчики событий (start) //
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
  //scaleControlSmaller.removeEventListener('click', rediceSzePicture);
  scaleControlSmaller.removeEventListener('click', scaleControlSmaller);

  // клик по кнопке "+"
  scaleControlBigger.removeEventListener('click', scaleControlBigger);

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

restoreDefault();
// обработчики событий (end) //
//-//
