const DEFAULT_SCALE = 100;
const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const smallerButtonScale = document.querySelector('.scale__control--smaller');
const biggerButtonScale = document.querySelector('.scale__control--bigger');
const scaleInputControl = document.querySelector('.scale__control--value');
const imageScalePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageScalePreview.style.transform = `scale(${value / 100})`;
  scaleInputControl.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputControl.value, 10);
  let newValue = currentValue - STEP_SCALE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputControl.value, 10);
  let newValue = currentValue + STEP_SCALE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  return imageScalePreview(DEFAULT_SCALE);
};

smallerButtonScale.addEventListener('click', onSmallerButtonClick);
biggerButtonScale.addEventListener('click', onBiggerButtonClick);

export {resetScale};
