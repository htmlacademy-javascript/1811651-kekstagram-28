import { isEscapeKey } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const userComment = socialComments.querySelector('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const COMMENTS_PER_PORTION = 5;
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
let shownComments = 0;

const createNewComment = (comment) => {
  const newComment = userComment.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__text').textContent = comment.message;
  newComment.querySelector('.social__picture').alt = comment.name;
  return newComment;
};

const showBigPicture = (thumbnailId) => {
  socialComments.innerHTML = '';
  const {comments, url, likes, description} = thumbnailId;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const renderComments = () => {
    shownComments += COMMENTS_PER_PORTION;
    const fragment = document.createDocumentFragment();
    if (shownComments >= comments.length) {
      shownComments = comments.length;
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
    for (let i = 0; i < shownComments; i++) {
      const commentElement = createNewComment(comments[i]);
      fragment.append(commentElement);
    }
    socialComments.innerHTML = '';
    socialComments.appendChild(fragment);
    socialCommentCount.innerHTML = `${shownComments} из <span class="comments-count">${comments.length}</span> комментариев`;
  };
  renderComments(comments);
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
