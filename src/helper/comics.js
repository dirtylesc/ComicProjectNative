/* eslint-disable quotes */
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
  equalTo,
  child,
  off,
  startAt,
} from 'firebase/database';
import {getMultipleRandomArr} from './helper';

export const getComics = (limit, callback, orderBy = 'id', isDesc = false) => {
  let data = [];
  let comicCategoriesRef = ref(database, 'comic_categories');

  if (limit) {
    comicCategoriesRef = query(
      comicCategoriesRef,
      isDesc ? limitToLast(limit) : limitToFirst(limit),
    );
  }

  let comicsRef = query(
    ref(database, 'comics'),
    orderBy === 'id' ? orderByKey() : orderByChild(orderBy),
  );

  let i = 0;
  onChildAdded(comicCategoriesRef, snapshot => {
    let tempComicsRef = child(comicsRef, snapshot.key);
    onValue(tempComicsRef, childSnapshot => {
      i++;
      const tempChildSnapshot = childSnapshot.toJSON();
      data.push({
        id: tempChildSnapshot.id,
        name: tempChildSnapshot.name,
        avatar: tempChildSnapshot.avatar,
        created_at: tempChildSnapshot.created_at,
        categories: Object.entries(snapshot.toJSON()),
      });
      if (i === limit) {
        callback(data);
      }
    });
  });

  if (limit === null) {
    callback(data);
  }
};

export const getRandomComics = (limit, callback) => {
  let data = [];
  let comicCategoriesRef = ref(database, 'comic_categories');

  let comicsRef = ref(database, 'comics');

  let i = 0;
  onChildAdded(comicCategoriesRef, snapshot => {
    let tempComicsRef = child(comicsRef, snapshot.key);
    onValue(tempComicsRef, childSnapshot => {
      i++;
      const tempChildSnapshot = childSnapshot.toJSON();
      data.push({
        id: tempChildSnapshot.id,
        name: tempChildSnapshot.name,
        avatar: tempChildSnapshot.avatar,
        created_at: tempChildSnapshot.created_at,
        categories: Object.entries(snapshot.toJSON()),
      });
      if (i === limit) {
        callback(getMultipleRandomArr(data, limit));
      }
    });
  });
};
