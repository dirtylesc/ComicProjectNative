/* eslint-disable quotes */
import {database} from '../../firebaseConfig';
import {ref, onValue} from 'firebase/database';

export const getUsers = () => {
  const usersRef = ref(database, 'users');
  let data;
  onValue(usersRef, snapshot => {
    data = snapshot.val();
  });
  return data;
};

export const getUser = (uid, callback) => {
  const usersRef = ref(database, `users/${uid}`);
  let data;
  onValue(usersRef, snapshot => {
    data = snapshot.val();

    if (data) {
      callback(data);
    }
  });
  return null;
};
