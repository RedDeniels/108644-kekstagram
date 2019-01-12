'use strict';

(function () {

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

  window.effect = {
    uploadImage: uploadImage,
    effectsPrefix: effectsPrefix,
    defaultEffect: defaultEffect,
    onEffectClick: onEffectClick

  };
})();
