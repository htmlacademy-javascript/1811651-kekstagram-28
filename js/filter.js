import { getRandomArray } from './util.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandom = () => getRandomArray(pictures, 10);

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilterPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, 10);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    if(evt.target.id === currentFilter) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    cb(getFilterPictures());
  });
};

const init = (loadedPictures, cb) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(cb);
};

export {init, getFilterPictures};
