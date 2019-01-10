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

  window.backend.load(function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PICTURE_AMOUNT; i++) {
      picturesElementsList[i] = photos[i];
      fragment.appendChild(renderPictureElement(picturesElementsList[i]));
    }
    pictures.appendChild(fragment);
  });

  window.picture = {
    picturesElementsList: picturesElementsList
  };
})();
