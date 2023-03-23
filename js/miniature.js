const templateThumbnails = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnails = ({url, description, likes, comments}) => {
  const thumbnail = templateThumbnails.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnails(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export {renderThumbnails};

