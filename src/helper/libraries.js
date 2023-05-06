/* eslint-disable quotes */
import {database} from '../../firebaseConfig';
import {
  ref,
  query,
  orderByChild,
  onChildAdded,
  orderByKey,
  onValue,
  child,
  push,
  update,
  remove,
} from 'firebase/database';

export const getComicsForLibrary = (userUid, callback, orderBy = 'id') => {
  let data = [];
  let libraryRef = query(
    ref(database, `libraries/${userUid}`),
    orderBy === 'id' ? orderByKey() : orderByChild(orderBy),
  );

  onChildAdded(libraryRef, snapshot => {
    const childSnapshot = snapshot.toJSON();
    let comicName = '';

    if (orderBy === 'alphabetical') {
      const comicRef = child(
        ref(database, `comics/${childSnapshot.comic_id}`),
        'name',
      );
      onValue(comicRef, comicSnapshot => {
        comicName = comicSnapshot.toJSON();
      });
    }

    const dataAdd = {
      id: snapshot.key,
      comicId: childSnapshot.comic_id,
      comicName: comicName,
      chapterId: childSnapshot.chapter_id,
    };
    data.unshift(dataAdd);

    callback([...data]);
  });

  // off(libraryRef, 'child_added');
};

export const addComicToLibrary = (userId, comicId, chapterId) => {
  push(ref(database, `libraries/${userId}`), {
    comic_id: comicId,
    chapter_id: chapterId.toString(),
    created_at: Date.now(),
    updated_at: Date.now(),
  });
};

export const removeComicFromLibrary = (userId, id) => {
  remove(ref(database, `libraries/${userId}/${id}`)).catch(error => {
    return false;
  });
  return true;
};

export const updateComicFromLibrary = (userId, comicId, chapterId) => {
  const libraryRef = ref(database, `libraries/${userId}`);

  onChildAdded(libraryRef, librarySnapshot => {
    const lChild = librarySnapshot.toJSON().comic_id;
    if (comicId.toString() === lChild) {
      update(ref(database, `libraries/${userId}/${librarySnapshot.key}`), {
        comic_id: lChild,
        chapter_id: chapterId.toString(),
        updated_at: Date.now(),
      });

      return;
    }
  });
};
