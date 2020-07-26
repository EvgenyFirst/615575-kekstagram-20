'use strict';

var goCreateRenderData = function () {
  // Сообщения для комментариев (случайные) (start) //
  var MESSAGE = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
  ];
  // Сообщения для комментариев (случайные) (end) //
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
      // for (var i = 0; i < 25; i++) {
      var infoPhotos = {
        url: "photos/" + (getValueInterval(1, 25)) + ".jpg", // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25
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

  var pictures = makeInfoPhotos();
  var bigPictureComments = pictures[0].comments;
  addElement(renderElements, pictures, picturesDifferent);
  InfoBigPicture(pictures[0]);
  addElement(addInfoInBigPictureComments, bigPictureComments, socialComments, getAmountObjectComment);
  // Добавление данных в блок с фото и комментариями (end) //
};

goCreateRenderData();
