// import {createDescriptionsOfPhotos} from './data.js';
import { renderGallery } from './gallery.js';
import './form.js';
import './scale.js';
import './effect.js';

// renderGallery(createDescriptionsOfPhotos());

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => {
    renderGallery(data);
  });
