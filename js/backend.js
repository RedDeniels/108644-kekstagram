'use strict';

(function () {
  var URLload = 'https://js.dump.academy/kekstagram/data';
  var URLupload = 'https://js.dump.academy/kekstagram';

  window.backend = {
    upload: function (data, onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('POST', URLupload);
      xhr.send(data);
    },
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URLload);

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.send();
    }
  };
})();
