/* eslint-disable no-shadow */
import {database} from '../../firebaseConfig';
import {
  ref,
  query,
  onValue,
  limitToFirst,
  limitToLast,
  orderByChild,
  onChildAdded,
  orderByKey,
  child,
  off,
  orderByValue,
} from 'firebase/database';

export const getFirstChapter = (comicId, callback) => {
  let comicChaptersRef = query(
    ref(database, `comic_chapters/${comicId}`),
    orderByChild('number'),
    limitToFirst(1),
  );

  onValue(comicChaptersRef, snapshot => {
    callback(Object.values(snapshot.toJSON())[0]);
  });
};

export const getChapter = (comicId, chapterId, callback) => {
  let chapterRef = query(ref(database, `chapters/${comicId}/${chapterId}`));

  onValue(chapterRef, snapshot => {
    callback(snapshot.toJSON());
  });
};

export const getAllChapters = (comicId, callback) => {
  var data = [];
  let comicChaptersRef = query(
    ref(database, `chapters/${comicId}`),
    orderByChild('number'),
  );

  onValue(comicChaptersRef, snapshot => {
    snapshot.forEach(child => {
      data.push({...child.val(), id: child.key});
    });
    callback(data);
  });
};

const getCountChapters = (comicId, callback) => {
  let comicChaptersRef = query(ref(database, `comic_chapters/${comicId}`));

  let i = 0;
  onChildAdded(comicChaptersRef, snapshot => {
    ++i;
  });
  callback(i);
};
