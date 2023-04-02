const uploadForm = document.querySelector('.img-upload__form');
const fileField = uploadForm.querySelector('#upload-file');
const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtags = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');


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

// export {onFileInputChange, onCancelButtonClick};
