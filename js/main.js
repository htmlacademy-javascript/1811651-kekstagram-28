// import {createDescriptionsOfPhotos} from './data.js';
import { renderGallery } from './gallery.js';
import { setUserFormSubmit, hideModal } from './form.js';
import './scale.js';
import './effect.js';
import { getData } from './api.js';

// renderGallery(createDescriptionsOfPhotos());

getData()
  .then((data) => {
    renderGallery(data);
  });

setUserFormSubmit(hideModal);
