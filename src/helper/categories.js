import {onChildAdded, ref} from 'firebase/database';
import {getDownloadURL, getStorage, ref as refStorage} from 'firebase/storage';
import {database} from '../../firebaseConfig';

export const getAllCategories = callback => {
  const storage = getStorage();
  const categoriesRef = ref(database, 'categories');
  let data = [];

  onChildAdded(categoriesRef, async snapshot => {
    const tempSnapshot = snapshot.toJSON();

    const imageRef = refStorage(
      storage,
      `categories/${tempSnapshot.slug}/${tempSnapshot.image}`,
    );

    await getDownloadURL(imageRef).then(x => {
      tempSnapshot.image = x;
    });

    data.push(tempSnapshot);

    callback([...data]);
  });
};
