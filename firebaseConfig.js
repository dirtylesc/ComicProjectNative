import {initializeApp} from 'firebase/app';
import {initializeAuth} from 'firebase/auth';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getReactNativePersistence} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDEV4F70hEX28hc0pi9UyTs0cnx4iz4Vdc',
  authDomain: 'comic-project-native.firebaseapp.com',
  databaseURL:
    'https://comic-project-native-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'comic-project-native',
  storageBucket: 'comic-project-native.appspot.com',
  messagingSenderId: '361397781078',
  appId: '1:361397781078:web:8ff0045cafd5f62db331f7',
  measurementId: 'G-3Q7RB1B6FJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// const analytics = firebase.getAnalytics(app);
export const auth = getAuth(app);

export const database = getDatabase(app);
