import {ref, getStorage, getDownloadURL} from 'firebase/storage';

export const getImage = async path => {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  await getDownloadURL(imageRef).then(x => {
    return x;
  });
};

export const getMutipleImages = async (arrImages, callback) => {
  var data = [];

  const storage = getStorage();

  let i = 0;
  for (const imagePath of arrImages) {
    const imageRef = ref(storage, imagePath);

    await getDownloadURL(imageRef).then(x => {
      callback(prev => [...prev, x]);
    });
  }
};
