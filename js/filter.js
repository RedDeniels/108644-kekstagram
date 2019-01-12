'use strict';

(function () {
  var FILTER_NEW_COUNT = 10;
  var imgFilters = document.querySelector('.img-filters');
  var filterPopular = document.getElementById('filter-popular');
  var filterNew = document.getElementById('filter-new');
  var filterDiscussed = document.getElementById('filter-discussed');

  var filterSwitch = function () {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  };

  var toClearPictures = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      window.picture.pictures.removeChild(item);
    });
  };

  var newFilter = function () {
    var newPictures = window.picture.picturesElementsList.slice();
    var j;
    var store;
    for (var i = newPictures.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      store = newPictures[j];
      newPictures[j] = newPictures[i];
      newPictures[i] = store;
    }
    toClearPictures();
    window.picture.renderPictures(newPictures, FILTER_NEW_COUNT);
  };

  var onFilterPopularClick = function () {
    filterSwitch();
    filterPopular.classList.add('img-filters__button--active');
    toClearPictures();
    window.picture.renderPictures(window.picture.picturesElementsList, window.picture.PICTURE_AMOUNT);
  };

  var onFilterNewClick = function () {
    filterSwitch();
    filterNew.classList.add('img-filters__button--active');
    newFilter();
  };

  var onFilterDiscussedClick = function () {
    filterSwitch();
    filterDiscussed.classList.add('img-filters__button--active');
  };

  filterPopular.addEventListener('click', onFilterPopularClick);
  filterNew.addEventListener('click', onFilterNewClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);

  window.filter = {
    imgFilters: imgFilters
  };
})();
