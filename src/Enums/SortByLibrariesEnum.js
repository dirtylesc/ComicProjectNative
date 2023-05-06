const RECENT_READING = {
  key: 0,
  title: 'Recent reading',
  by: 'updated_at',
};
const A_TO_Z = {
  key: 1,
  title: 'A to Z',
  by: 'alphabetical',
};
const TIME_ADDED = {
  key: 2,
  title: 'Time added',
  by: 'created_at',
};

export const ArrayView = () => {
  return [RECENT_READING, A_TO_Z, TIME_ADDED];
};

export const getValueByKey = key => {
  switch (key) {
    case RECENT_READING.key:
      return RECENT_READING;
    case A_TO_Z.key:
      return A_TO_Z;
    case TIME_ADDED.key:
      return TIME_ADDED;
    default:
      break;
  }
};
