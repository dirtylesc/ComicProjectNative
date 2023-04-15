import {ref, getStorage, getDownloadURL} from 'firebase/storage';

export const getImage = async path => {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  await getDownloadURL(imageRef).then(x => {
    return x;
  });
};
