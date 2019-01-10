'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MAX_LENGHT_HASHTAG = 20;
  var uploadFile = document.getElementById('upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');

  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var uploadImage = document.querySelector('.img-upload__preview')
      .querySelector('img');
  var effectNone = document.getElementById('effect-none');
  var effectChrome = document.getElementById('effect-chrome');
  var effectSepia = document.getElementById('effect-sepia');
  var effectMarvin = document.getElementById('effect-marvin');
  var effectPhobos = document.getElementById('effect-phobos');
  var effectHeat = document.getElementById('effect-heat');

  var effectsPrefix = 'effects__preview--';
  var effectChromeName = 'chrome';
  var effectSepiaName = 'sepia';
  var effectMarvinName = 'marvin';
  var effectPhobosName = 'phobos';
  var effectHeatName = 'heat';
  var defaultEffect = effectHeatName;
  var userEffect = defaultEffect;

  var effectLevelLine = document.querySelector('.effect-level__line');
  var EFFECT_LEVEL_LINE_WIDTH = 453;
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelUser = 1;

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
  // ---- Работа фильтров ----

  var switchEffect = function () {
    uploadImage.className = '';
    imgUploadEffectLevel.classList.remove('hidden');
    uploadImage.style.filter = 'none';
  };

  var onSpecialEffectClick = function (effect) {
    userEffect = effect;
    switchEffect();
    uploadImage.classList.add(effectsPrefix + effect);
    if (userEffect === effectChromeName) {
      uploadImage.style.filter = 'grayscale(' + effectLevelUser / 100 + ')';
    } else if (userEffect === effectSepiaName) {
      uploadImage.style.filter = 'sepia(' + effectLevelUser / 100 + ')';
    } else if (userEffect === effectMarvinName) {
      uploadImage.style.filter = 'invert(' + effectLevelUser + '%)';
    } else if (userEffect === effectPhobosName) {
      uploadImage.style.filter = 'blur(' + effectLevelUser / 100 * 3 + 'px)';
    } else if (userEffect === effectHeatName) {
      var heatEffectLevel = effectLevelUser / 100 * 2 + 1;
      uploadImage.style.filter = 'brightness(' + heatEffectLevel + ')';
    }

  };

  var onEffectNoneClick = function () {
    switchEffect();
    imgUploadEffectLevel.classList.add('hidden');
  };

  var onEffectClick = function () {
    effectChrome.addEventListener('click', function () {
      onSpecialEffectClick(effectChromeName);
    });
    effectSepia.addEventListener('click', function () {
      onSpecialEffectClick(effectSepiaName);
    });
    effectMarvin.addEventListener('click', function () {
      onSpecialEffectClick(effectMarvinName);
    });
    effectPhobos.addEventListener('click', function () {
      onSpecialEffectClick(effectPhobosName);
    });
    effectHeat.addEventListener('click', function () {
      onSpecialEffectClick(effectHeatName);
    });
    effectNone.addEventListener('click', onEffectNoneClick);
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var startCoords = evt.clientX;

    var onEffectLevelPinMouseMove = function (moveEvt) {
      if (startCoords < effectLevelLine.getBoundingClientRect().left) {
        startCoords = effectLevelLine.getBoundingClientRect().left;
      } else if (startCoords > effectLevelLine.getBoundingClientRect().right) {
        startCoords = effectLevelLine.getBoundingClientRect().right;
      }
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      if (effectLevelPin.offsetLeft - shift > EFFECT_LEVEL_LINE_WIDTH) {
        effectLevelPin.style.left = EFFECT_LEVEL_LINE_WIDTH + 'px';
      } else if (effectLevelPin.offsetLeft - shift < 0) {
        effectLevelPin.style.left = 0 + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
      }
      var minEffectLevel = effectLevelLine.getBoundingClientRect().left;
      var maxEffectLevel = effectLevelLine.getBoundingClientRect().right;
      var lengthEffectLevel = maxEffectLevel - minEffectLevel;
      effectLevelValue.value = (((moveEvt.pageX - minEffectLevel) / lengthEffectLevel) * 100).toFixed();
      if (effectLevelValue.value < 0) {
        effectLevelValue.value = 0;
      } else if (effectLevelValue.value > 100) {
        effectLevelValue.value = 100;
      }
      effectLevelUser = effectLevelValue.value;
      effectLevelDepth.style.width = effectLevelValue.value + '%';
      onSpecialEffectClick(userEffect);
    };

    var onEffectLevelPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onEffectLevelPinMouseMove);
      document.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    };

    document.addEventListener('mousemove', onEffectLevelPinMouseMove);
    document.addEventListener('mouseup', onEffectLevelPinMouseUp);
  });

  // ---- Появление и скрытие попапа и полноэкранного режима просмотра ----

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
    uploadImage.classList.add(effectsPrefix + defaultEffect);
    onEffectClick();
  };

  var closeImgUploadOverlay = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onImgUploadOverlayEscPress);
    textHashtags.removeEventListener('change', textHashtagsValidation);
    imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
    imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
    textHashtags.removeEventListener('focus', onTextDescriptionFocus);
  };

  uploadFile.addEventListener('change', function () {
    openImgUploadOverlay();
  });

  imgUploadCancel.addEventListener('click', function () {
    closeImgUploadOverlay();
  });

  // ---- обработка Хештегов ----

  var hashTagsСompareCheck = function (hashTags) {
    for (var index = 0; index < hashTags.length; index++) {
      if (index < hashTags.length - 1) {
        for (var j = index + 1; j < hashTags.length; j++) {
          if (hashTags[index].toLowerCase() === hashTags[j].toLowerCase()) {
            textHashtags.setCustomValidity('Хештеги не должны повторяться');
          }
        }
      }
    }
  };

  var hashTagsCheck = function (hashTags) {
    for (var index = 0; index < hashTags.length; index++) {
      if (hashTags.length === 0) {
        textHashtags.setCustomValidity('');
      } else if (hashTags[index].charAt(0) !== '#') {
        textHashtags.setCustomValidity('Хештеги должны начинаться со знака #');
      } else if (hashTags[index] === '#') {
        textHashtags.setCustomValidity('Хештег не может состоять только из символа #');
      } else if (hashTags[index].substr(1).includes('#')) {
        textHashtags.setCustomValidity('Внутри хештега не должно быть символа #');
      } else if (hashTags[index].length > MAX_LENGHT_HASHTAG) {
        textHashtags.setCustomValidity('Хештег не должен быть длиннее 20 символов');
      } else if (hashTags.length > MAX_HASHTAGS) {
        textHashtags.setCustomValidity('Максимальное количество хештегов: ' + MAX_HASHTAGS);
      } else {
        textHashtags.setCustomValidity('');
      }
    }
  };

  var separationHashTags = function (text) {
    var hashTagsArr = text.split(' ');
    for (var symbol = hashTagsArr.length; symbol > 0; symbol--) {
      if (hashTagsArr[symbol] === '') {
        hashTagsArr.splice(symbol, 1);
      }
    }
    if (hashTagsArr[0] === '') {
      hashTagsArr = [];
    }
    return hashTagsArr;
  };

  var hashTagsValidity = function (hashTags) {
    var hashTagsArr = separationHashTags(hashTags);
    hashTagsCheck(hashTagsArr);
    hashTagsСompareCheck(hashTagsArr);

  };

  var textHashtagsValidation = function () {
    hashTagsValidity(textHashtags.value);
  };

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
    textHashtagsValidation();
    if (textHashtags.validationMessage !== '') {
      textHashtags.reportValidity();
      textHashtags.addEventListener('change', textHashtagsValidation);
    } else {
      window.backend.upload(new FormData(imgUploadForm), onPictureUploadSuccess, onPictureUploadError);
    }
  };

  window.form = {
    main: main,
    error: error
  };
})();
