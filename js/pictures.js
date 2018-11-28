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
var pictureList = [];

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
  var picture = {
    url: getPictureUrl(pictureAddress, number, extension),
    likes: randomCount(likesMax, likesMin),
    comments: getCommentsList(commentsList),
    description: getDescription(descriptionsList)
  };

  return picture;
};

for (var i = 0; i < PICTURE_AMOUNT; i++) {
  console.log(generatePicture(pictureList, PICTURE_ADDRESS, i, PICTURE_EXTENSION, LIKES_MAX, LIKES_MIN, COMMENTS_LIST, DESCRIPTIONS_LIST));
}

