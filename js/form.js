'use strict';

(function () {
  var uploadFile = document.getElementById('upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');

  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var main = document.querySelector('main');
  var error = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorButtonAgain = error.querySelector('.error__button-again');
  var errorButtonOther = error.querySelector('.error__button-other');
  var success = document.querySelector('#success')
    .content
    .querySelector('.success');
  var successButton = success.querySelector('.success__button');

  var onImgUploadOverlayEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeImgUploadOverlay();
    }
  };

  var onTextHashTagsFocus = function () {
    document.removeEventListener('keydown', onImgUploadOverlayEscPress);
    textHashtags.addEventListener('blur', onTextHashTagsBlur);

  };

  var onTextDescriptionFocus = function () {
    document.removeEventListener('keydown', onImgUploadOverlayEscPress);
    textDescription.removeEventListener('focus', onTextDescriptionFocus);
    textDescription.addEventListener('blur', onTextDescriptionBlur);

  };

  var onTextHashTagsBlur = function () {
    document.addEventListener('keydown', onImgUploadOverlayEscPress);
  };

  var onTextDescriptionBlur = function () {
    document.addEventListener('keydown', onImgUploadOverlayEscPress);
  };

  var openImgUploadOverlay = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadOverlayEscPress);
    imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
    textHashtags.addEventListener('focus', onTextHashTagsFocus);
    textDescription.addEventListener('focus', onTextDescriptionFocus);
    window.effect.uploadImage.classList.add(window.effect.prefix + window.effect.standard);
    window.effect.onClick();
  };

  var closeImgUploadOverlay = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onImgUploadOverlayEscPress);
    textHashtags.removeEventListener('change', window.hashtag.textValidation);
    imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
    imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
    textDescription.removeEventListener('focus', onTextDescriptionFocus);
  };

  uploadFile.addEventListener('change', function () {
    openImgUploadOverlay();
  });

  imgUploadCancel.addEventListener('click', function () {
    closeImgUploadOverlay();
  });

  var onSuccessButtonClick = function () {
    successButton.removeEventListener('click', onSuccessButtonClick);
    main.querySelector('.success').remove();
  };

  var onPictureUploadSuccess = function () {
    var fragment = success.cloneNode(true);
    successButton = fragment.querySelector('.success__button');
    main.appendChild(fragment);
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    textHashtags.value = '';
    textDescription.value = '';
    successButton.addEventListener('click', onSuccessButtonClick);
  };

  var onErrorButtonAgainClick = function () {
    errorButtonAgain.removeEventListener('click', onErrorButtonAgainClick);
    main.querySelector('.error').remove();
    var event = new Event('click');
    onImgUploadFormSubmit(event);
  };

  var onErrorButtonOtherClick = function () {
    errorButtonOther.removeEventListener('click', onErrorButtonOtherClick);
    main.querySelector('.error').remove();
    uploadFile.value = '';
    textHashtags.value = '';
    textDescription.value = '';
    uploadFile.click();
  };

  var onPictureUploadError = function () {
    var fragment = error.cloneNode(true);
    errorButtonAgain = fragment.querySelector('.error__button-again');
    errorButtonOther = fragment.querySelector('.error__button-other');
    main.appendChild(fragment);
    imgUploadOverlay.classList.add('hidden');
    errorButtonAgain.addEventListener('click', onErrorButtonAgainClick);
    errorButtonOther.addEventListener('click', onErrorButtonOtherClick);
  };

  var onImgUploadFormSubmit = function (evt) {
    evt.preventDefault();
    window.hashtag.textValidation();
    if (textHashtags.validationMessage !== '') {
      textHashtags.reportValidity();
      textHashtags.style.outlineColor = 'red';
      textHashtags.addEventListener('change', window.hashtag.textValidation);
    } else {
      window.backend.upload(new FormData(imgUploadForm), onPictureUploadSuccess, onPictureUploadError);
      textHashtags.style.outlineColor = '';
    }
  };

  window.form = {
    textHashtags: textHashtags,
    main: main,
    error: error
  };
})();
