'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    randomCount: function (max, min) {
      if (arguments.length === 1) {
        return Math.floor(Math.random() * max);
      }
      return Math.floor(Math.random() * (max - min) + min);
    }
  };
})();
