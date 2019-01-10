'use strict';

(function () {

  var PICTURE_AMOUNT = 25;
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var picturesElementsList = [];

  var createPictureElement = function (pictureElement, pictureBlock) {
    pictureBlock.querySelector('.picture__img').src = pictureElement.url;
    pictureBlock.querySelector('.picture__likes').textContent = pictureElement.likes;
    pictureBlock.querySelector('.picture__comments').textContent = pictureElement.comments.length;
  };

  var renderPictureElement = function (photos) {
    var pictureBlock = picture.cloneNode(true);
    createPictureElement(photos, pictureBlock);

    return pictureBlock;
  };

  var onPictureLoadSuccess = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PICTURE_AMOUNT; i++) {
      picturesElementsList[i] = photos[i];
      fragment.appendChild(renderPictureElement(picturesElementsList[i]));
    }
    pictures.appendChild(fragment);
    window.gallery.onSmallPicturesClick();
  };

  var onPictureLoadError = function (errorMessage) {
    var fragment = window.form.error.cloneNode(true);
    fragment.querySelector('.error__title').textContent = errorMessage;
    window.form.main.appendChild(fragment);

    // Заглушка

  };

  window.backend.load(onPictureLoadSuccess, onPictureLoadError);

  window.picture = {
    picturesElementsList: picturesElementsList,
    pictures: pictures
  };
})();
