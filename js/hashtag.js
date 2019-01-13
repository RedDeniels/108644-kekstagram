'use strict';

(function () {

  var MAX_HASHTAGS = 5;
  var MAX_LENGHT_HASHTAG = 20;

  var hashTagsСompareCheck = function (hashTags) {
    for (var index = 0; index < hashTags.length; index++) {
      if (index < hashTags.length - 1) {
        for (var j = index + 1; j < hashTags.length; j++) {
          if (hashTags[index].toLowerCase() === hashTags[j].toLowerCase()) {
            window.form.textHashtags.setCustomValidity('Хештеги не должны повторяться');
          }
        }
      }
    }
  };

  var hashTagsCheck = function (hashTags) {
    for (var index = 0; index < hashTags.length; index++) {
      if (hashTags.length === 0) {
        window.form.textHashtags.setCustomValidity('');
      } else if (hashTags[index].charAt(0) !== '#') {
        window.form.textHashtags.setCustomValidity('Хештеги должны начинаться со знака #');
      } else if (hashTags[index] === '#') {
        window.form.textHashtags.setCustomValidity('Хештег не может состоять только из символа #');
      } else if (hashTags[index].substr(1).includes('#')) {
        window.form.textHashtags.setCustomValidity('Внутри хештега не должно быть символа #');
      } else if (hashTags[index].length > MAX_LENGHT_HASHTAG) {
        window.form.textHashtags.setCustomValidity('Хештег не должен быть длиннее 20 символов');
      } else if (hashTags.length > MAX_HASHTAGS) {
        window.form.textHashtags.setCustomValidity('Максимальное количество хештегов: ' + MAX_HASHTAGS);
      } else {
        window.form.textHashtags.setCustomValidity('');
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

  var textValidation = function () {
    hashTagsValidity(window.form.textHashtags.value);
  };

  window.hashtag = {
    textValidation: textValidation
  };
})();
