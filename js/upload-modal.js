import { isEscapeKey } from './util.js';

const templateFragmentSuccess = document.querySelector('#success').content;
const successModal = templateFragmentSuccess.querySelector('.success');
const successButton = templateFragmentSuccess.querySelector('.success__button');
const body = document.querySelector('body');

const closeSuccess = () => {
  successModal.remove();
};
const showSuccessUpload = () => {
  body.appendChild(successModal);
  const closeNotActiveSuccess = (evt) => {
    if(!evt.target.closest('.success__inner')) {
      closeSuccess();
    }
  };
  successButton.addEventListener('click', closeSuccess, {once: true});
  document.addEventListener('keydown', onEscapeDownSuccess, true);
  successModal.addEventListener('click', closeNotActiveSuccess);
};

const templateFragmentError = document.querySelector('#error').content;
const errorModal = templateFragmentError.querySelector('.error');
const errorButton = templateFragmentError.querySelector('.error__button');

const closeError = () => {
  errorModal.remove();
};

const showErrorUpload = () => {
  body.appendChild(errorModal);
  const closeNotActiveError = (evt) => {
    if(!evt.target.closest('.error__inner')) {
      closeError();
    }
  };
  errorButton.addEventListener('click', closeError, {once: true});
  document.addEventListener('keydown', onEscapeDownError, true);
  errorModal.addEventListener('click', closeNotActiveError);
};


function onEscapeDownSuccess (evt) {
  if (isEscapeKey(evt)) {
    document.removeEventListener('keydown', onEscapeDownSuccess, true);
    closeSuccess();
  }
}
function onEscapeDownError (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.removeEventListener('keydown', onEscapeDownError, true);
    closeError();
  }
}
export {showSuccessUpload, showErrorUpload};
