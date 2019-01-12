'use strict';

(function () {

  var PICTURE_AMOUNT = 25;
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var picturesElementsList;

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

  var renderPictures = function (photos, amount) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < amount; i++) {
      pictures[i] = photos[i];
      fragment.appendChild(renderPictureElement(pictures[i]));
    }
    pictures.appendChild(fragment);
  };

  var onPictureLoadSuccess = function (photos) {
    window.picture.picturesElementsList = photos.slice();
    window.filter.sortPictures = photos.slice();
    renderPictures(photos, PICTURE_AMOUNT);
    window.gallery.onSmallPicturesClick();
    window.filter.imgFilters.classList.remove('img-filters--inactive');
  };

  var onPictureLoadError = function (errorMessage) {
    var fragment = window.form.error.cloneNode(true);
    fragment.querySelector('.error__title').textContent = errorMessage;
    window.form.main.appendChild(fragment);
  };

  window.backend.load(onPictureLoadSuccess, onPictureLoadError);

  window.picture = {
    picturesElementsList: picturesElementsList,
    pictures: pictures,
    renderPictures: renderPictures,
    PICTURE_AMOUNT: PICTURE_AMOUNT
  };
})();
