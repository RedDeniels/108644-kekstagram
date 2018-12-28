'use strict';

(function () {
  var getPictureUrl = function (address, number, extension) {
    return address + number + extension;
  };

  var getCommentsList = function (commentsList) {
    var pictureComments = [];
    pictureComments.length = window.util.randomCount(1, commentsList.length);
    for (var i = 0; i < pictureComments.length; i++) {
      pictureComments[i] = commentsList[window.util.randomCount(commentsList.length)];
    }
    return pictureComments;
  };

  var getDescription = function (descriptionsList) {
    return descriptionsList[window.util.randomCount(descriptionsList.length)];
  };

  window.data = {
    generatePicture: function (list, pictureAddress, number, extension, likesMax, likesMin, commentsList, descriptionsList) {
      var pictureInfo = {
        url: getPictureUrl(pictureAddress, number + 1, extension),
        likes: window.util.randomCount(likesMax, likesMin),
        comments: getCommentsList(commentsList),
        description: getDescription(descriptionsList)
      };
      return pictureInfo;
    }
  };
})();
