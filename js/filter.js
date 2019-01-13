'use strict';

(function () {
  var FILTER_NEW_COUNT = 10;
  var FILTER_SWITCH_TIME = 500;
  var block = document.querySelector('.img-filters');
  var filterPopular = document.getElementById('filter-popular');
  var filterNew = document.getElementById('filter-new');
  var filterDiscussed = document.getElementById('filter-discussed');
  var sortPictures;
  var lastTimeout;

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

  var onFilterPopularClick = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      filterSwitch();
      filterPopular.classList.add('img-filters__button--active');
      toClearPictures();
      window.filter.sortPictures = window.picture.elements;
      window.picture.render(window.filter.sortPictures, window.picture.AMOUNT);
      window.gallery.onSmallPicturesClick();
    }, FILTER_SWITCH_TIME);

  };

  var onFilterNewClick = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      filterSwitch();
      filterNew.classList.add('img-filters__button--active');
      newFilterSorting();
    }, FILTER_SWITCH_TIME);

  };

  var onFilterDiscussedClick = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      filterSwitch();
      filterDiscussed.classList.add('img-filters__button--active');
      discussedFilterSorting();
    }, FILTER_SWITCH_TIME);
  };

  filterPopular.addEventListener('click', onFilterPopularClick);
  filterNew.addEventListener('click', onFilterNewClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);

  window.filter = {
    block: block,
    sortPictures: sortPictures
  };
})();
