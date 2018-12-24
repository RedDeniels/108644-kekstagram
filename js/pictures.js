'use strict';

var PICTURE_AMOUNT = 25;
var PICTURE_ADDRESS = 'photos/';
var PICTURE_EXTENSION = '.jpg';
var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо было бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS_LIST = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом и с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var picturesElementsList = [];
var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var bigPicture = document.querySelector('.big-picture');
var BIG_PICTURE_EXAMPLE = 1;
var commentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var socialComments = document.querySelector('.social__comments');
var COMMENT_AVATAR_ADDRESS = 'img/';
var COMMENT_AVATAR_PREFIX = 'avatar-';
var COMMENT_AVATAR_EXTENSION = '.svg';
var COMMENT_AMOUNT = 6;

var getPictureUrl = function (address, number, extension) {
  return address + number + extension;
};

var randomCount = function (max, min) {
  if (arguments.length === 1) {
    return Math.floor(Math.random() * max);
  }
  return Math.floor(Math.random() * (max - min) + min);
};

var getCommentsList = function (commentsList) {
  var pictureComments = [];
  pictureComments.length = randomCount(1, commentsList.length);
  for (var i = 0; i < pictureComments.length; i++) {
    pictureComments[i] = commentsList[randomCount(commentsList.length)];
  }
  return pictureComments;
};

var getDescription = function (descriptionsList) {
  return descriptionsList[randomCount(descriptionsList.length)];
};

var generatePicture = function (list, pictureAddress, number, extension, likesMax, likesMin, commentsList, descriptionsList) {
  var pictureInfo = {
    url: getPictureUrl(pictureAddress, number + 1, extension),
    likes: randomCount(likesMax, likesMin),
    comments: getCommentsList(commentsList),
    description: getDescription(descriptionsList)
  };
  return pictureInfo;
};

var createPictureElement = function (pictureElement, pictureBlock) {
  pictureBlock.querySelector('.picture__img').src = pictureElement.url;
  pictureBlock.querySelector('.picture__likes').textContent = pictureElement.likes;
  pictureBlock.querySelector('.picture__comments').textContent = pictureElement.comments.length;
};

var renderPictureElement = function (i, pictureElementList, pictureAddress, pictureExtension, likeMin, likeMax, commentsList, descriptionsList) {
  picturesElementsList[i] = generatePicture(picturesElementsList, pictureAddress, i, pictureExtension, likeMin, likeMax, commentsList, descriptionsList);
  var pictureBlock = picture.cloneNode(true);
  createPictureElement(picturesElementsList[i], pictureBlock);

  return pictureBlock;
};

var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PICTURE_AMOUNT; i++) {
    fragment.appendChild(renderPictureElement(i, picturesElementsList, PICTURE_ADDRESS, PICTURE_EXTENSION, LIKES_MAX, LIKES_MIN, COMMENTS_LIST, DESCRIPTIONS_LIST));
  }
  pictures.appendChild(fragment);
};

var hidingDefaultComments = function () {
  var socialCommentsList = document.querySelectorAll('.social__comment');
  for (var i = 0; i < socialCommentsList.length; i++) {
    socialCommentsList[i].classList.add('visually-hidden');
  }
};

var renderBigPictureCommentsList = function (comments, commentsBlock) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(renderBigPictureComment(comments[i], commentsBlock));
  }
  commentsBlock.appendChild(fragment);
};

var renderBigPictureComment = function (commentText, commentsBlock) {

  var comment = commentsBlock.querySelector('.social__comment').cloneNode(true);
  comment.querySelector('.social__picture').src = COMMENT_AVATAR_ADDRESS + COMMENT_AVATAR_PREFIX + randomCount(COMMENT_AMOUNT, 1) + COMMENT_AVATAR_EXTENSION;
  comment.querySelector('.social__text').textContent = commentText;
  comment.classList.remove('visually-hidden');

  return comment;
};

var renderBigPicture = function () {
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  hidingDefaultComments();

  bigPicture.querySelector('.big-picture__img img').src = picturesElementsList[BIG_PICTURE_EXAMPLE].url;
  bigPicture.querySelector('.likes-count').textContent = picturesElementsList[BIG_PICTURE_EXAMPLE].likes;
  bigPicture.querySelector('.comments-count').textContent = picturesElementsList[BIG_PICTURE_EXAMPLE].comments.length;
  bigPicture.querySelector('.social__caption').textContent = picturesElementsList[BIG_PICTURE_EXAMPLE].description;
  renderBigPictureCommentsList(picturesElementsList[BIG_PICTURE_EXAMPLE].comments, socialComments);
};

renderPictures();

// ---- 4 задание ----

var ESC_KEYCODE = 27;
var MAX_HASHTAGS = 5;
var MAX_LENGHT_HASHTAG = 20;
var uploadFile = document.getElementById('upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var smallPictures = document.querySelectorAll('.picture');
var bigPictureCancel = document.querySelector('.big-picture__cancel');

var textHashtags = document.querySelector('.text__hashtags');
// var textDescription = document.querySelector('.text__description');
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
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelUser = 1;

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

var effectLevelPinСalculation = function (evt) {
  var minEffectLevel = effectLevelLine.getBoundingClientRect().left;
  var maxEffectLevel = effectLevelLine.getBoundingClientRect().right;
  var lengthEffectLevel = maxEffectLevel - minEffectLevel;
  effectLevelValue.value = (((evt.pageX - minEffectLevel) / lengthEffectLevel) * 100).toFixed();
  effectLevelUser = effectLevelValue.value;
  onSpecialEffectClick(userEffect);
};

var onEffectLevelPinMouseup = function () {
  effectLevelLine.addEventListener('mouseup', effectLevelPinСalculation);
};

// ---- Появление и скрытие попапа и полноэкранного режима просмотра ----

var onImgUploadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImgUploadOverlay();
  }
};

var openImgUploadOverlay = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadOverlayEscPress);
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
  uploadImage.classList.add(effectsPrefix + defaultEffect);
  onEffectClick();
  onEffectLevelPinMouseup();
};

var closeImgUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onImgUploadOverlayEscPress);
};

uploadFile.addEventListener('change', function () {
  openImgUploadOverlay();
});

imgUploadCancel.addEventListener('click', function () {
  closeImgUploadOverlay();
});

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var openBigPicture = function (evt) {
  evt.preventDefault();
  renderBigPicture();
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
  // здесь должно быть ожидание изменения инпута
};

var textHashtagsValidation = function () {
  hashTagsValidity(textHashtags.value);
};

var onImgUploadFormSubmit = function (evt) {
  evt.preventDefault();
  textHashtagsValidation();
  if (textHashtags.validationMessage === '') {
    evt.target.submit();
  }
};
