const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const imageEffectPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects'); // Список
const containerSlider = document.querySelector('.img-upload__effect-level');
const sliderInput = document.querySelector('.effect-level__slider');
const effectLevelSlider = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;


const showSlider = () => {
  containerSlider.classList.remove('hidden');
};

const hideSlider = () => {
  containerSlider.classList.add('hidden');
};

const updateSlider = () => {
  sliderInput.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.start,
  });

  if(isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value
  );
  imageEffectPreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};


const onSliderUpdate = () => {
  const sliderValue = sliderInput.noUiSlider.get();
  imageEffectPreview.style.filter = isDefault() ? DEFAULT_EFFECT.style : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelSlider.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderInput, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  stop: DEFAULT_EFFECT.step,
  connect: 'lower'
});

hideSlider();

effectsList.addEventListener('change', onEffectsChange);
sliderInput.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
