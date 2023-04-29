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
  equalTo,
} from 'firebase/database';
import {
  getMultipleRandomArr,
  calculateAvgRateComic,
  lastElement,
} from './helper';

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
        slug: tempChildSnapshot.slug,
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
    let ratingRef = query(
      ref(database, `ratings/${snapshot.key}`),
      limitToLast(3),
    );
    let chapterRef = ref(database, `chapters/${snapshot.key}`);

    onValue(comicRef, childSnapshot => {
      const tempChildSnapshot = childSnapshot.toJSON();
      tempChildSnapshot.categories = Object.values(snapshot.toJSON());

      onValue(ratingRef, ratingSnapshot => {
        if (ratingSnapshot.toJSON()) {
          tempChildSnapshot.ratings = Object.values(ratingSnapshot.toJSON());
        }
      });

      onValue(chapterRef, chapterSnapshot => {
        var chapters = {};
        if (chapterSnapshot.toJSON()) {
          chapters = Object.values(chapterSnapshot.toJSON());
        }
        tempChildSnapshot.chaptersCount = chapterSnapshot.size || 0;
        tempChildSnapshot.lastChapter = lastElement(chapters);
      });
      tempChildSnapshot.id = id;

      off(comicRef, 'value');

      callback(tempChildSnapshot);
    });
  });
};

export const findComics = (p, limit, callback) => {
  let data = [];
  let comicCategoriesRef = ref(database, 'comic_categories');
  let comicsRef = query(ref(database, 'comics'));

  let i = 0;
  onChildAdded(comicsRef, comicSnapshot => {
    let tempComicSnapshot = comicSnapshot.toJSON();
    if (
      tempComicSnapshot.name.toLowerCase().includes(p.toLowerCase().trim()) ||
      tempComicSnapshot.author.toLowerCase().includes(p.toLowerCase().trim())
    ) {
      let tempComicCategoriesRef = child(comicCategoriesRef, comicSnapshot.key);
      let ratingRef = ref(database, `ratings/${comicSnapshot.key}`);

      onValue(tempComicCategoriesRef, categoriesSnapshot => {
        if (categoriesSnapshot.toJSON()) {
          var avgRate = 0;

          onValue(ratingRef, ratingSnapshot => {
            if (ratingSnapshot.toJSON()) {
              tempComicSnapshot.ratings = Object.values(
                ratingSnapshot.toJSON(),
              );
              avgRate = calculateAvgRateComic(
                Object.values(tempComicSnapshot.ratings),
              );
            }
          });

          data.push({
            id: comicSnapshot.key,
            name: tempComicSnapshot.name,
            avatar: tempComicSnapshot.avatar,
            author: tempComicSnapshot.author,
            slug: tempComicSnapshot.slug,
            avgRate: avgRate,
            categories: Object.entries(categoriesSnapshot.toJSON()),
          });
        }
      });
    }

    if (++i === limit) {
      off(comicsRef, 'child_added');
      callback([...data]);
    }
  });
};

export const getComicWithChapters = (comicId, chapterId, callback) => {
  let comicRef = ref(database, `comics/${comicId}`);
  let chaptersRef = ref(database, `chapters/${comicId}`);
  let chapterRef = ref(database, `chapters/${comicId}/${chapterId}`);

  onValue(comicRef, childSnapshot => {
    const tempChildSnapshot = childSnapshot.toJSON();

    onValue(chaptersRef, chaptersSnapshot => {
      tempChildSnapshot.chaptersCount = chaptersSnapshot.size || 0;
    });

    onValue(chapterRef, chapterSnapshot => {
      tempChildSnapshot.currentChapter = chapterSnapshot.toJSON();
    });
    tempChildSnapshot.comicId = comicId;

    off(comicRef, 'value');

    callback(tempChildSnapshot);
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
        slug: tempChildSnapshot.slug,
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
  let comicsRef = query(ref(database, 'comics'));

  let i = 0;
  onChildAdded(comicsRef, comicSnapshot => {
    let tempComicSnapshot = comicSnapshot.toJSON();
    let tempComicCategoriesRef = child(comicCategoriesRef, comicSnapshot.key);
    let ratingRef = ref(database, `ratings/${comicSnapshot.key}`);

    onValue(tempComicCategoriesRef, categoriesSnapshot => {
      if (categoriesSnapshot.toJSON()) {
        var avgRate = 0;

        onValue(ratingRef, ratingSnapshot => {
          if (ratingSnapshot.toJSON()) {
            tempComicSnapshot.ratings = Object.values(ratingSnapshot.toJSON());
            avgRate = calculateAvgRateComic(
              Object.values(tempComicSnapshot.ratings),
            );
          }
        });

        data.push({
          id: comicSnapshot.key,
          name: tempComicSnapshot.name,
          avatar: tempComicSnapshot.avatar,
          slug: tempComicSnapshot.slug,
          avgRate: avgRate,
          categories: Object.entries(categoriesSnapshot.toJSON()),
        });
      }

      if (++i === limit) {
        off(comicsRef, 'child_added');
        callback(data);
      }
    });
  });
};

export const getRankedCompletedComics = (limit, callback) => {
  let data = [];
  let comicCategoriesRef = ref(database, 'comic_categories');
  let comicsRef = query(ref(database, 'comics'));

  let i = 0;
  onChildAdded(comicsRef, comicSnapshot => {
    let tempComicSnapshot = comicSnapshot.toJSON();
    if (tempComicSnapshot.completed_at) {
      let tempComicCategoriesRef = child(comicCategoriesRef, comicSnapshot.key);
      let ratingRef = ref(database, `ratings/${comicSnapshot.key}`);

      onValue(tempComicCategoriesRef, categoriesSnapshot => {
        if (categoriesSnapshot.toJSON()) {
          var avgRate = 0;

          onValue(ratingRef, ratingSnapshot => {
            if (ratingSnapshot.toJSON()) {
              tempComicSnapshot.ratings = Object.values(
                ratingSnapshot.toJSON(),
              );
              avgRate = calculateAvgRateComic(
                Object.values(tempComicSnapshot.ratings),
              );
            }
          });

          data.push({
            id: comicSnapshot.key,
            name: tempComicSnapshot.name,
            avatar: tempComicSnapshot.avatar,
            slug: tempComicSnapshot.slug,
            avgRate: avgRate,
            categories: Object.entries(categoriesSnapshot.toJSON()),
          });
        }
      });
    }

    if (++i === limit) {
      off(comicsRef, 'child_added');
      callback(data);
    }
  });
};
