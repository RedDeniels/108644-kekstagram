'use strict';

(function () {

  var LEVEL_LINE_WIDTH = 453;
  var DEFAULT_LEVEL = 100;
  var MAX_LEVEL = 100;

  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var uploadImage = document.querySelector('.img-upload__preview')
      .querySelector('img');
  var effectNone = document.getElementById('effect-none');
  var effectChrome = document.getElementById('effect-chrome');
  var effectSepia = document.getElementById('effect-sepia');
  var effectMarvin = document.getElementById('effect-marvin');
  var effectPhobos = document.getElementById('effect-phobos');
  var effectHeat = document.getElementById('effect-heat');

  var prefix = 'effects__preview--';
  var effectChromeName = 'chrome';
  var effectSepiaName = 'sepia';
  var effectMarvinName = 'marvin';
  var effectPhobosName = 'phobos';
  var effectHeatName = 'heat';
  var standard = effectHeatName;
  var userEffect = standard;

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelUser = 100;

  var switchEffect = function () {
    uploadImage.className = '';
    imgUploadEffectLevel.classList.remove('hidden');
    uploadImage.style.filter = 'none';
  };

  var onSpecialEffectClick = function (effect) {
    userEffect = effect;
    switchEffect();
    uploadImage.classList.add(prefix + effect);
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
      if (effectLevelPin.offsetLeft - shift > LEVEL_LINE_WIDTH) {
        effectLevelPin.style.left = LEVEL_LINE_WIDTH + 'px';
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
      } else if (effectLevelValue.value > MAX_LEVEL) {
        effectLevelValue.value = MAX_LEVEL;
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

  var reset = function () {
    effectLevelPin.style.left = LEVEL_LINE_WIDTH + 'px';
    effectLevelUser = DEFAULT_LEVEL;
    effectLevelDepth.style.width = DEFAULT_LEVEL + '%';
  };

  var onEffectChromeClick = function () {
    reset();
    onSpecialEffectClick(effectChromeName);
  };

  var onEffectSepiaClick = function () {
    reset();
    onSpecialEffectClick(effectSepiaName);
  };

  var onEffectMarvinClick = function () {
    reset();
    onSpecialEffectClick(effectMarvinName);
  };

  var onEffectPhobosClick = function () {
    reset();
    onSpecialEffectClick(effectPhobosName);
  };

  var onEffectHeatClick = function () {
    reset();
    onSpecialEffectClick(effectHeatName);
  };

  var onClick = function () {
    effectChrome.addEventListener('click', onEffectChromeClick);
    effectSepia.addEventListener('click', onEffectSepiaClick);
    effectMarvin.addEventListener('click', onEffectMarvinClick);
    effectPhobos.addEventListener('click', onEffectPhobosClick);
    effectHeat.addEventListener('click', onEffectHeatClick);
    effectNone.addEventListener('click', onEffectNoneClick);
  };

  window.effect = {
    uploadImage: uploadImage,
    prefix: prefix,
    standard: standard,
    onClick: onClick,
    reset: reset

  };
})();
