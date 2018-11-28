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
var fragment = document.createDocumentFragment();
var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

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

var renderPicture = function (i, pictureElementList, pictureAddress, pictureExtension, likeMin, likeMax, commentsList, descriptionsList) {
  picturesElementsList[i] = generatePicture(picturesElementsList, pictureAddress, i, pictureExtension, likeMin, likeMax, commentsList, descriptionsList);
  var pictureBlock = picture.cloneNode(true);
  createPictureElement(picturesElementsList[i], pictureBlock);

  return pictureBlock;
};
for (var i = 0; i < PICTURE_AMOUNT; i++) {
  fragment.appendChild(renderPicture(i, picturesElementsList, PICTURE_ADDRESS, PICTURE_EXTENSION, LIKES_MAX, LIKES_MIN, COMMENTS_LIST, DESCRIPTIONS_LIST));
}
pictures.appendChild(fragment);


