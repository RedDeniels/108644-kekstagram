'use strict';

(function () {

  var AMOUNT = 25;
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var container = document.querySelector('.pictures');
  var elements;

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

  var render = function (photos, amount) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < amount; i++) {
      container[i] = photos[i];
      fragment.appendChild(renderPictureElement(container[i]));
    }
    container.appendChild(fragment);
  };

  var onPictureLoadSuccess = function (photos) {
    window.picture.elements = photos.slice();
    window.filter.sortPictures = photos.slice();
    render(photos, AMOUNT);
    window.gallery.onSmallPicturesClick();
    window.filter.block.classList.remove('img-filters--inactive');
  };

  window.backend.load(onPictureLoadSuccess);

  window.picture = {
    elements: elements,
    container: container,
    render: render,
    AMOUNT: AMOUNT
  };
})();
