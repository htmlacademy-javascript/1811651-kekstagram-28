import { isEscapeKey } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const userComment = socialComments.querySelector('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const COMMENTS_PER_PORTION = 4;
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
let shownComments = 0;
let commentList;

const createNewComment = (comment) => {
  const newComment = userComment.cloneNode(true);
  const socialPicture = newComment.querySelector('.social__picture');
  const socialText = newComment.querySelector('.social__text');
  socialPicture.src = comment.avatar;
  socialText.textContent = comment.message;
  socialPicture.alt = comment.name;
  return newComment;
};

const renderComments = (comments) => {
  shownComments += COMMENTS_PER_PORTION;
  const fragment = document.createDocumentFragment();
  if (shownComments >= comments.length) {
    shownComments = comments.length;
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', addComments);
  } else {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', addComments);
  }
  comments.forEach((currentValue, index) => {
    if (index < shownComments) {
      fragment.append(createNewComment(comments[index]));
    }
  });
  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
  socialCommentCount.innerHTML = `${shownComments} из <span class="comments-count">125</span> комментариев`;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
};
function addComments () {
  renderComments(commentList);
}

const showBigPicture = (thumbnailId) => {
  socialComments.innerHTML = '';
  shownComments = 0;
  const {comments, url, likes, description} = thumbnailId;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  renderComments(comments);
  commentList = comments;
};

closeButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  shownComments = 0;
});

document.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    shownComments = 0;
  }
});

export {showBigPicture};
