'use strict';

// Модуль, который создает данные

// Случайное для комментариев
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
// Имена авторов (случайные)
var NAMES = ['Артем'];

var getValueInterval = function (min, max) { // Чтобы включалось и минимальное, и максимальное значение в заданном интервале.
  min = Math.ceil(min); // Метод Math.ceil() округление вверх. Округляет аргумент до ближайшего большего целого.
  max = Math.floor(max); // возвращение целого числоа, которое <= числу.
  var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomValue;
};

// перебор элементов по длине массива
var getRandomValue = function (element) {
  return element[getValueInterval(0, element.length - 1)];
};

// Добавление комментариев
var addComments = function () {
  var count = getValueInterval(1, 100);
  var valueInterval = [];
  for (var i = 0; i < count; i++) {
    valueInterval[i] = getRandomValue(COMMENTS);
  }
  return valueInterval;
};

// Cлучайные данные авторов
var getAmountObjectComment = function (count) {
  var сomments = [];
  for (var i = 0; i < count; i++) {
    var comment = {
      avatar: 'img/avatar-' + getValueInterval(0, 6) + '.svg',
      message: addComments(COMMENTS),
      name: getRandomValue(NAMES),
    };
    сomments[i] = comment;
  }
  return сomments;
};

// Функция для создания массива из 25 сгенерированных JS объектов
var makeInfoPhotos = function () {
  var contents = [];
  for (var i = 0; i < 25; i++) {
    var infoPhotos = {
      url: 'photos/' + (i + 1) + '.jpg', // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25
      description: '', // строка — описание фотографии
      likes: getValueInterval(15, 200), // число — количество лайков, поставленных фотографии. Случайное число от 15 до 200
      comments: getAmountObjectComment(getValueInterval(0, 6)) // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии
    };
    contents[i] = infoPhotos;
  }
  return contents;
};

// Заполнение данными из массива getAmountObjectComment
var template = document.querySelector('#picture').content.querySelector('.picture');

// Отрисовка сгенерированных DOM-элементов
var renderElements = function (picture) {
  var pictureElement = template.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};
var contentPhotos = makeInfoPhotos();

// Для вставки элементов используется DocumentFragment
var pictureElement = document.createDocumentFragment();

var pictures = document.querySelector('.pictures');
for (var i = 0; i < contentPhotos.length; i++) {
  pictureElement.appendChild(renderElements(contentPhotos[i]));
}

pictures.appendChild(pictureElement);

