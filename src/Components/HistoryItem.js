/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import {ref, getStorage, getDownloadURL} from 'firebase/storage';

import {colors} from 'res/colors';
import {calculateUpdatedComicTime} from 'helper/helper';

import {ListItemTitle} from 'Components';
import {getComicWithChapters} from 'helper/comics';

function HistoryItem({comicId, chapterId, time, onPress}) {
  const [data, setData] = useState();
  const [url, setUrl] = useState();
  useEffect(() => {
    getComicWithChapters(comicId, chapterId, res => {
      setData(res);
    });
  }, [chapterId, comicId]);

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, `/comic_images/${data.avatar}`);

      await getDownloadURL(imageRef).then(x => {
        setUrl(x);
      });
    };

    if (url === undefined && data?.avatar) {
      func();
    }
  }, [data, url]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.centeredView}>
        <Image source={{uri: url}} resizeMode="cover" style={styles.avatar} />
        <View style={[{flex: 1}, styles.flexRow]}>
          <View style={styles.infoBox}>
            <ListItemTitle fs={18} numberOfLines={2}>
              {data?.name}
            </ListItemTitle>
            <View style={styles.flexRow}>
              <Text style={styles.text}>
                {data?.currentChapter?.number}/{data?.chaptersCount}
              </Text>
              <Text style={[styles.text, {marginLeft: 20}]}>
                {calculateUpdatedComicTime(time, 'l')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.6,
  },
  infoBox: {
    flex: 1,
    marginLeft: 20,
  },
  text: {
    color: colors.medium,
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.6,
  },
  flexRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 70,
    height: 100,
  },
});

export default HistoryItem;
