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

var getCommentsList = function (commentsList) {
  var pictureComments = [];
  pictureComments.length = window.util.randomCount(1, commentsList.length);
  for (var i = 0; i < pictureComments.length; i++) {
    pictureComments[i] = commentsList[window.util.randomCount(commentsList.length)];
  }
  return pictureComments;
};

var getDescription = function (descriptionsList) {
  return descriptionsList[window.util.randomCount(descriptionsList.length)];
};

var generatePicture = function (list, pictureAddress, number, extension, likesMax, likesMin, commentsList, descriptionsList) {
  var pictureInfo = {
    url: getPictureUrl(pictureAddress, number + 1, extension),
    likes: window.util.randomCount(likesMax, likesMin),
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
  comment.querySelector('.social__picture').src = COMMENT_AVATAR_ADDRESS + COMMENT_AVATAR_PREFIX + window.util.randomCount(COMMENT_AMOUNT, 1) + COMMENT_AVATAR_EXTENSION;
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

var bigPictureCancel = document.querySelector('.big-picture__cancel');
var smallPictures = document.querySelectorAll('.picture');

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE) {
    closeBigPicture();
  }
};

var onSmallPicturesClick = function () {
  for (var i = 0; i < smallPictures.length; i++) {
    var smallPicture = smallPictures[i];
    smallPicture.addEventListener('click', openBigPicture);
  }
};

onSmallPicturesClick();

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

var openBigPicture = function (evt) {
  evt.preventDefault();
  renderBigPicture();
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureCancel.addEventListener('click', closeBigPicture);
};
