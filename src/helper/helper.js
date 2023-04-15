import {colors} from 'res/colors';

const YEAR_TIME = 1000 * 3600 * 24 * 365;
const WEEK_TIME = 1000 * 3600 * 24 * 7;
const DAY_TIME = 1000 * 3600 * 24;
const HOUR_TIME = 1000 * 3600;
const MINUTE_TIME = 1000 * 60;

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

export const calculateAvgRateComic = ratings => {
  let sumRate = 0;
  ratings.forEach(element => {
    sumRate += element.rate;
  });

  return sumRate / ratings.length;
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

export const calculateUpdatedComicTime = time => {
  var arrDate = time.split(' ');
  var time1 = arrDate[0].split('/');
  var time2 = arrDate[1].split(':');
  var date1 = new Date(
    time1[2],
    time1[1],
    time1[0],
    time2[0],
    time2[1],
    time2[2],
  );
  var date2 = Date.now();
  var string = '';

  var differenceInTime = date2 - date1.getTime();
  string = differenceInTime + 's';

  if (differenceInTime > YEAR_TIME) {
    return Math.floor(differenceInTime / YEAR_TIME) + 'yr';
  } else if (differenceInTime > WEEK_TIME) {
    return Math.floor(differenceInTime / WEEK_TIME) + 'w';
  } else if (differenceInTime > DAY_TIME) {
    return Math.floor(differenceInTime / DAY_TIME) + 'd';
  } else if (differenceInTime > HOUR_TIME) {
    return Math.floor(differenceInTime / HOUR_TIME) + 'h';
  } else if (differenceInTime > MINUTE_TIME) {
    return Math.floor(differenceInTime / MINUTE_TIME) + 'm';
  }

  return string;
};

export const lastElement = arr => {
  return arr[arr.length - 1];
};
