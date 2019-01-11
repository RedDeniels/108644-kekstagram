'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialComments = document.querySelector('.social__comments');

  var hidingDefaultComments = function () {
    var socialCommentsList = document.querySelectorAll('.social__comment');
    for (var i = 0; i < socialCommentsList.length; i++) {
      socialCommentsList[i].classList.add('visually-hidden');
    }
  };

  var renderBigPictureCommentsList = function (comments, commentsBlock) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(renderBigPictureComment(comments[i], commentsBlock));
    }
    commentsBlock.appendChild(fragment);
  };

  var renderBigPictureComment = function (commentInfo, commentsBlock) {
    var comment = commentsBlock.querySelector('.social__comment').cloneNode(true);
    comment.querySelector('.social__picture').src = commentInfo.avatar;
    comment.querySelector('.social__text').textContent = commentInfo.message;
    comment.classList.remove('visually-hidden');

    return comment;
  };

  window.preview = {
    bigPicture: bigPicture,
    renderBigPicture: function (pictureElement) {
      bigPicture.classList.remove('hidden');
      commentCount.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');
      hidingDefaultComments();

      bigPicture.querySelector('.big-picture__img img').src = pictureElement.url;
      bigPicture.querySelector('.likes-count').textContent = pictureElement.likes;
      bigPicture.querySelector('.comments-count').textContent = pictureElement.comments.length;
      bigPicture.querySelector('.social__caption').textContent = pictureElement.description;
      renderBigPictureCommentsList(pictureElement.comments, socialComments);
    }
  };
})();
