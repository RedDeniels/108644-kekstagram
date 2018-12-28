'use strict';

var COMMENT_AVATAR_ADDRESS = 'img/';
var COMMENT_AVATAR_PREFIX = 'avatar-';
var COMMENT_AVATAR_EXTENSION = '.svg';
var COMMENT_AMOUNT = 6;

var bigPicture = document.querySelector('.big-picture');
var BIG_PICTURE_EXAMPLE = 1;
var commentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var socialComments = document.querySelector('.social__comments');

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

  bigPicture.querySelector('.big-picture__img img').src = window.picture.picturesElementsList[BIG_PICTURE_EXAMPLE].url;
  bigPicture.querySelector('.likes-count').textContent = window.picture.picturesElementsList[BIG_PICTURE_EXAMPLE].likes;
  bigPicture.querySelector('.comments-count').textContent = window.picture.picturesElementsList[BIG_PICTURE_EXAMPLE].comments.length;
  bigPicture.querySelector('.social__caption').textContent = window.picture.picturesElementsList[BIG_PICTURE_EXAMPLE].description;
  renderBigPictureCommentsList(window.picture.picturesElementsList[BIG_PICTURE_EXAMPLE].comments, socialComments);
};

var bigPictureCancel = document.querySelector('.big-picture__cancel');
var smallPictures = document.querySelectorAll('.picture');

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE) {
    closeBigPicture();
  }
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
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
