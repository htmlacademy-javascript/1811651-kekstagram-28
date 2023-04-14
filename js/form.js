import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import { sendData } from './api.js';
import { showSuccessUpload, showErrorUpload } from './upload-modal.js';

const uploadForm = document.querySelector('#upload-select-image');
const fileField = uploadForm.querySelector('#upload-file');
const body = document.querySelector('body');
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtags = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COUNT_HASHTAGS = 5;
const ERROR_HASHTAG = 'Некорректный хэштег';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};


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
  resetScale();
  resetEffects();
};

const onFocusedTextField = () =>
  document.activeElement === hashtags ||
   document.activeElement === commentField;


function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && !onFocusedTextField()) {
    evt.preventDefault();
    hideModal();
  }
}

const onFileInputChange = () => {
  showModal();
};

const onCancelButtonClick = () => {
  hideModal();
};

fileField.addEventListener('change', onFileInputChange);
closeButton.addEventListener('click', onCancelButtonClick);

const isValidTag = (tag) =>
  HASHTAG_VALID_SYMBOLS.test(tag);


const hasValidCount = (tags) =>
  tags.length <= MAX_COUNT_HASHTAGS;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags.every(isValidTag) && hasValidCount(tags) && hasUniqueTags(tags);
};

pristine.addValidator(
  hashtags,
  validateTags,
  ERROR_HASHTAG
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(() => {
          onSuccess();
          showSuccessUpload();
        })
        .catch(() => {
          showErrorUpload();
        }).finally(unblockSubmitButton);
    }
  });
};

export {setUserFormSubmit, hideModal};
