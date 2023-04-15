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
  child,
  off,
} from 'firebase/database';
import {getMultipleRandomArr, calculateAvgRateComic} from './helper';

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

      const dataAdd = {
        id: childSnapshot.key,
        name: tempChildSnapshot.name,
        avatar: tempChildSnapshot.avatar,
        categories: Object.entries(snapshot.toJSON()),
      };
      data.unshift(dataAdd);

      if (i === limit) {
        callback([...data]);
      }

      off(tempComicsRef, 'value');
    });
  });

  if (limit === null) {
    callback(data);
  }
};

export const getComic = (id, callback) => {
  let comicCategoryRef = ref(database, `comic_categories/${id}`);
  onValue(comicCategoryRef, snapshot => {
    let comicRef = ref(database, `comics/${snapshot.key}`);
    onValue(comicRef, childSnapshot => {
      const tempChildSnapshot = childSnapshot.toJSON();
      tempChildSnapshot.categories = Object.values(snapshot.toJSON());
      tempChildSnapshot.ratings = Object.entries(tempChildSnapshot.ratings);

      if (tempChildSnapshot.chapters) {
        tempChildSnapshot.chapters = Object.entries(tempChildSnapshot.chapters);
      }

      off(comicRef, 'value');

      callback(tempChildSnapshot);
    });
  });
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
        id: childSnapshot.key,
        name: tempChildSnapshot.name,
        avatar: tempChildSnapshot.avatar,
        created_at: tempChildSnapshot.created_at,
        categories: Object.entries(snapshot.toJSON()),
      });
      if (i === limit) {
        callback(getMultipleRandomArr(data, limit));
      }

      off(tempComicsRef, 'value');
    });
  });
};

export const getRankedComics = (limit, callback) => {
  let data = [];
  let comicCategoriesRef = ref(database, 'comic_categories');
  let comicsRef = ref(database, 'comics');

  let i = 0;
  onChildAdded(comicCategoriesRef, snapshot => {
    let tempComicsRef = child(comicsRef, snapshot.key);

    onValue(tempComicsRef, childSnapshot => {
      const tempChildSnapshot = childSnapshot.toJSON();
      const avgRate = calculateAvgRateComic(
        Object.values(tempChildSnapshot.ratings),
      );

      data.push({
        id: childSnapshot.key,
        name: tempChildSnapshot.name,
        avatar: tempChildSnapshot.avatar,
        avgRate: avgRate,
        categories: Object.entries(snapshot.toJSON()),
      });

      off(tempComicsRef, 'value');

      if (++i === limit) {
        callback(data);
      }
    });
  });
};
