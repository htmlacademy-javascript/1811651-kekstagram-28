// import {createDescriptionsOfPhotos} from './data.js';
import { setUserFormSubmit, hideModal } from './form.js';
import { renderGallery } from './gallery.js';
import './scale.js';
import './effect.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

// renderGallery(createDescriptionsOfPhotos());

getData()
  .then((data) => {
    renderGallery(data);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(hideModal);
