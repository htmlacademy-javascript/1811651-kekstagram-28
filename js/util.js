const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArray = (element, numberOfElement) => {
  const idOfElement = createRandomIdFromRangeGenerator (0, element.length - 1);
  const newElements = [];
  for(let i = 0; i < numberOfElement; i++) {
    newElements.push(element[idOfElement()]);
  }
  return newElements.join(' ');
};

export {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArray};
