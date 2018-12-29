'use strict';

var bigPictureCancel = document.querySelector('.big-picture__cancel');
var smallPictures = document.querySelectorAll('.picture');

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE) {
    closeBigPicture();
  }
};

var closeBigPicture = function () {
  window.preview.bigPicture.classList.add('hidden');
};

var openBigPicture = function (evt) {
  evt.preventDefault();
  window.preview.renderBigPicture();
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureCancel.addEventListener('click', closeBigPicture);
};

var onSmallPicturesClick = function () {
  for (var i = 0; i < smallPictures.length; i++) {
    var smallPicture = smallPictures[i];
    smallPicture.addEventListener('click', openBigPicture);
  }
};

onSmallPicturesClick();
