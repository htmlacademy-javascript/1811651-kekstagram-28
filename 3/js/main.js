const COMMENTS_TEMPLATES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Альберт',
  'Иван',
  'Антон',
  'Игорь',
  'Дмитрий',
  'Яна',
  'Ольга',
  'Лариса',
  'Катя',
  'Махмуд'
];

const DESCRIPTION_TEMPLATES = [
  'Как я провёл лето',
  'Наконец-то пятница - лейтяйница',
  'Вот это поворот',
  'И смех, и грех',
  'А я говорил!',
  'Самое красивое место на планете'
];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
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
}

const idPhoto = createRandomIdFromRangeGenerator(1, 25);
const idMessage = createRandomIdFromRangeGenerator(1, 500);
const idPhotoDescription = createRandomIdFromRangeGenerator(1, 25);

const getRandomArray = (element, numberOfElement) => {
  const idOfElement = createRandomIdFromRangeGenerator (0, element.length - 1);
  const newArray = [];
  for(let i = 0; i < numberOfElement; i++) {
    newArray.push(element[idOfElement()]);
  }
  return newArray.join(' ');
};

const createMessage = () => {
  const numberOfMessage = getRandomInteger(1, 2);
  return {
    id: idMessage(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.jpg`,
    message: getRandomArray(COMMENTS_TEMPLATES, numberOfMessage),
    name: getRandomArray(NAMES, 1)
  };
};

const createDescriptionPhoto = () => ({
  id: idPhotoDescription(),
  url: `photos/${idPhoto()}.jpg`,
  description: getRandomArray(DESCRIPTION_TEMPLATES, 1),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 8)}, createMessage)
});

const photosOfUsers = Array.from({length: 25}, createDescriptionPhoto);
