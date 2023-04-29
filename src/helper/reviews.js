import {onValue, ref} from 'firebase/database';
import {database} from '../../firebaseConfig';
import {calculateAvgRateComic} from './helper';

export const getReviews = (comicId, callback) => {
  let comicReviewsRef = ref(database, `ratings/${comicId}`);
  onValue(comicReviewsRef, snapshot => {
    const tempSnapshot = Object.values(snapshot.toJSON());
    tempSnapshot.avgRate = calculateAvgRateComic(tempSnapshot);

    callback(tempSnapshot);
  });
};
