'use strict';

var openCloseLoadedPhoto = function () {

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
};

openCloseLoadedPhoto();
