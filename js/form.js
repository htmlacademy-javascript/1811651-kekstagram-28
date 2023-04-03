const uploadForm = document.querySelector('.img-upload__form');
const fileField = uploadForm.querySelector('#upload-file');
const body = document.querySelector('body');
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtags = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COUNT_HASHTAGS = 5;
const ERROR_HASHTAG = 'Некорректный хэштег';


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const showModal = () => {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  uploadForm.reset();
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onFocusedTextField = () => {
  return document.activeElement === hashtags ||
   document.activeElement === commentField;
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && !onFocusedTextField()) {
    evt.preventDefault();
    hideModal();
  }
};

const onFileInputChange = () => {
  showModal();
};

const onCancelButtonClick = () => {
  hideModal();
};

fileField.addEventListener('change', onFileInputChange);
closeButton.addEventListener('click', onCancelButtonClick);

const isValidTag = (tag) => {
  return HASHTAG_VALID_SYMBOLS.test(tag);
};

const hasValidCount = (tags) => {
  return tags.length <= MAX_COUNT_HASHTAGS;
};

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags.every(isValidTag) && hasValidCount && hasUniqueTags;
};

pristine.addValidator(
  hashtags,
  validateTags,
  ERROR_HASHTAG
);

const onFormSubmit = (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
};

uploadForm.addEventListener('submit', onFormSubmit);

