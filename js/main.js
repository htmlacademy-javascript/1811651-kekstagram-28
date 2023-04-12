import { setUserFormSubmit, hideModal } from './form.js';
import { renderGallery } from './gallery.js';
import './scale.js';
import './effect.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { init, getFilterPictures } from './filter.js';
import './user-photo.js';

const debounceRenderGallery = debounce(renderGallery, 500);

getData()
  .then((data) => {
    init(data, debounceRenderGallery);
    renderGallery(getFilterPictures());
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(hideModal);
