'use strict';

(function () {
  var FILTER_NEW_COUNT = 10;
  var imgFilters = document.querySelector('.img-filters');
  var filterPopular = document.getElementById('filter-popular');
  var filterNew = document.getElementById('filter-new');
  var filterDiscussed = document.getElementById('filter-discussed');
  var sortPictures;

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
    window.filter.sortPictures = window.picture.picturesElementsList.slice();
    var j;
    var store;
    for (var i = window.filter.sortPictures.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      store = window.filter.sortPictures[j];
      window.filter.sortPictures[j] = window.filter.sortPictures[i];
      window.filter.sortPictures[i] = store;
    }
    toClearPictures();
    window.picture.renderPictures(window.filter.sortPictures, FILTER_NEW_COUNT);
    window.gallery.onSmallPicturesClick();
  };

  var discussedFilter = function () {
    window.filter.sortPictures = window.picture.picturesElementsList.slice();
    window.filter.sortPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    toClearPictures();
    window.picture.renderPictures(window.filter.sortPictures, window.filter.sortPictures.length);
    window.gallery.onSmallPicturesClick();
  };

  var onFilterPopularClick = function () {
    filterSwitch();
    filterPopular.classList.add('img-filters__button--active');
    toClearPictures();
    window.filter.sortPictures = window.picture.picturesElementsList;
    window.picture.renderPictures(window.filter.sortPictures, window.picture.PICTURE_AMOUNT);
    window.gallery.onSmallPicturesClick();
  };

  var onFilterNewClick = function () {
    filterSwitch();
    filterNew.classList.add('img-filters__button--active');
    newFilter();
  };

  var onFilterDiscussedClick = function () {
    filterSwitch();
    filterDiscussed.classList.add('img-filters__button--active');
    discussedFilter();
  };

  filterPopular.addEventListener('click', onFilterPopularClick);
  filterNew.addEventListener('click', onFilterNewClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);

  window.filter = {
    imgFilters: imgFilters,
    sortPictures: sortPictures
  };
})();
