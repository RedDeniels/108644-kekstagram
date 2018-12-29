'use strict';

(function () {

  var PICTURE_AMOUNT = 25;
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var PICTURE_ADDRESS = 'photos/';
  var PICTURE_EXTENSION = '.jpg';
  var COMMENTS_LIST = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо было бы убирать палец из кадра.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var picturesElementsList = [];
  var DESCRIPTIONS_LIST = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом и с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];

  var LIKES_MIN = 15;
  var LIKES_MAX = 200;

  var createPictureElement = function (pictureElement, pictureBlock) {
    pictureBlock.querySelector('.picture__img').src = pictureElement.url;
    pictureBlock.querySelector('.picture__likes').textContent = pictureElement.likes;
    pictureBlock.querySelector('.picture__comments').textContent = pictureElement.comments.length;
  };

  var renderPictureElement = function (i, pictureElementList, pictureAddress, pictureExtension, likeMin, likeMax, commentsList, descriptionsList) {
    picturesElementsList[i] = window.data.generatePicture(picturesElementsList, pictureAddress, i, pictureExtension, likeMin, likeMax, commentsList, descriptionsList);
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

  renderPictures();

  window.picture = {
    picturesElementsList: picturesElementsList
  };
})();
