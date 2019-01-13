'use strict';

(function () {

  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    window.preview.bigPicture.classList.add('hidden');
    window.preview.bigPictureCommentsHidden = [];
    window.preview.socialCommentVisually.textContent = 0;
  };

  var openBigPicture = function (evt) {
    evt.preventDefault();
    var pictureElement = 0;
    var pictureList = window.picture.container.querySelectorAll('.picture');
    for (var i = 0; i < pictureList.length; i++) {
      if (evt.target === pictureList[i].querySelector('img')) {
        pictureElement = window.filter.sortPictures[i];
        break;
      }
    }
    window.preview.renderBigPicture(pictureElement);
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureCancel.addEventListener('click', closeBigPicture);
  };

  var onSmallPicturesClick = function () {
    var smallPictures = document.querySelectorAll('.picture');
    for (var i = 0; i < smallPictures.length; i++) {
      var smallPicture = smallPictures[i];
      smallPicture.addEventListener('click', openBigPicture);
    }
  };

  window.gallery = {
    onSmallPicturesClick: onSmallPicturesClick,
  };
})();
