const checkStringLenght = (string, length) => string.length <= length;

checkStringLenght('проверяемая строка', 20);
checkStringLenght('проверяемая строка', 18);
checkStringLenght('проверяемая строка', 10);

const checkPalindrome = (string) => {
  string = string
    .toLowerCase()
    .replaceAll(' ', '');
  for (let i = 0; i < (string.length / 2); i++) {
    if (string.charAt(i) !== string.charAt(string.length - i - 1)) {
      return false;
    }
  }
  return true;
};

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');


const getNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  if (result === '') {
    return NaN;
  }
  return parseInt(result, 10);
};

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');

const generateAddress = (string, minLength, addSymbols) => {
  const actualLength = minLength - string.length;
  if (actualLength <= 0) {
    return string;
  }
  return addSymbols.slice(0, actualLength % addSymbols.length) + addSymbols.repeat(actualLength / addSymbols.length) + string;
};

generateAddress('1', 2, '0');
generateAddress('1', 4, '0');
generateAddress('q', 4, 'werty');
generateAddress('q', 4, 'we');
generateAddress('qwerty', 4, '0');

