import {colors} from 'res/colors';

const YEAR_TIME = 1000 * 3600 * 24 * 365;
const MONTH_TIME = 1000 * 3600 * 24 * 30;
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

export const getChapterNumber = number => {
  if (number < 10) {
    return '00' + number;
  } else if (number < 100) {
    return '0' + number;
  } else {
    return number;
  }
};

export const calculateUpdatedComicTime = (time, type = 's') => {
  if (!Number.isInteger(time)) {
    var arrDate = time.split(' ');
    var time1 = arrDate[0].split('/');
    var time2 = arrDate[1].split(':');
    time = new Date(
      time1[2],
      time1[1],
      time1[0],
      time2[0],
      time2[1],
      time2[2],
    ).getTime();
  }
  var date2 = Date.now();

  var differenceInTime = date2 - time;
  return timeStampToString(differenceInTime);
};

export const timeStampToString = (time, type) => {
  var string = time + 's';

  if (time > YEAR_TIME) {
    return Math.floor(time / YEAR_TIME) + (type === 's' ? 'yr' : ' year ago');
  } else if (time > MONTH_TIME) {
    return Math.floor(time / MONTH_TIME) + (type === 's' ? 'mo' : ' month ago');
  } else if (time > WEEK_TIME) {
    return Math.floor(time / WEEK_TIME) + (type === 's' ? 'w' : ' week ago');
  } else if (time > DAY_TIME) {
    return Math.floor(time / DAY_TIME) + (type === 's' ? 'd' : ' Day ago');
  } else if (time > HOUR_TIME) {
    return Math.floor(time / HOUR_TIME) + (type === 's' ? 'h' : ' Hour ago');
  } else if (time > MINUTE_TIME) {
    return (
      Math.floor(time / MINUTE_TIME) + (type === 's' ? 'm' : ' Minute ago')
    );
  }

  return string;
};

export const lastElement = arr => {
  return arr[arr.length - 1];
};

export const getKeyFromStorageItems = (arr, value) => {
  for (const [i, item] of arr.entries()) {
    if (item[0] === value) {
      return i;
    }
  }

  return -1;
};
