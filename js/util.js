'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var lastTimeout;

  var debounce = function (active, time) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(active, time);
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    debounce: debounce
  };
})();
