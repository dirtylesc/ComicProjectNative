import {colors} from 'res/colors';

export function getMultipleRandomArr(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

export function chunkify(arr, n) {
  var len = arr.length,
    out = [],
    i = 0;
  while (i < len) {
    out.push(arr.slice(i, (i += n)));
  }

  return out;
}

export const calculateHeightImage = type => {
  switch (type) {
    case 'l':
      return 130;
    case 'm':
      return 100;
    case 's':
      return 80;
    default:
      return 85;
  }
};

export const getColorRankedNumber = number => {
  switch (number) {
    case 1:
      return colors.secondary;
    case 2:
      return colors.tertiary;
    case 3:
      return colors.quaternary;
    default:
      return colors.medium;
  }
};
