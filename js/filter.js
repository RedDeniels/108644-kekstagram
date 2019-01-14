'use strict';

(function () {
  var FILTER_NEW_COUNT = 10;
  var FILTER_SWITCH_TIME = 500;
  var block = document.querySelector('.img-filters');
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
      window.picture.container.removeChild(item);
    });
  };

  var newFilterSorting = function () {
    window.filter.sortPictures = window.picture.elements.slice();
    var j;
    var store;
    for (var i = window.filter.sortPictures.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      store = window.filter.sortPictures[j];
      window.filter.sortPictures[j] = window.filter.sortPictures[i];
      window.filter.sortPictures[i] = store;
    }
    toClearPictures();
    window.picture.render(window.filter.sortPictures, FILTER_NEW_COUNT);
    window.gallery.onSmallPicturesClick();
  };

  var discussedFilterSorting = function () {
    window.filter.sortPictures = window.picture.elements.slice();
    window.filter.sortPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    toClearPictures();
    window.picture.render(window.filter.sortPictures, window.filter.sortPictures.length);
    window.gallery.onSmallPicturesClick();
  };

  var popularFilterChange = function () {
    filterSwitch();
    filterPopular.classList.add('img-filters__button--active');
    toClearPictures();
    window.filter.sortPictures = window.picture.elements;
    window.picture.render(window.filter.sortPictures, window.picture.AMOUNT);
    window.gallery.onSmallPicturesClick();
  };

  var onPopularFilterClick = function () {
    window.util.debounce(popularFilterChange, FILTER_SWITCH_TIME);
  };

  var discussedFilterChange = function () {
    filterSwitch();
    filterDiscussed.classList.add('img-filters__button--active');
    discussedFilterSorting();
  };

  var onDiscussedFilterClick = function () {
    window.util.debounce(discussedFilterChange, FILTER_SWITCH_TIME);
  };

  var newFilterChange = function () {
    filterSwitch();
    filterNew.classList.add('img-filters__button--active');
    newFilterSorting();
  };

  var onNewFilterClick = function () {
    window.util.debounce(newFilterChange, FILTER_SWITCH_TIME);
  };

  filterPopular.addEventListener('click', onPopularFilterClick);
  filterNew.addEventListener('click', onNewFilterClick);
  filterDiscussed.addEventListener('click', onDiscussedFilterClick);

  window.filter = {
    block: block,
    sortPictures: sortPictures
  };
})();
