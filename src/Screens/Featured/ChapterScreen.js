/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';

import {getChapter} from 'helper/chapters';
import {getMutipleImages} from 'helper/storage';
import {colors} from 'res/colors';
import {checkHasKey, getKeyFromStorageItems} from 'helper/helper';

const windowWidth = Dimensions.get('window').width;
function ChapterScreen({route, navigation}) {
  const [data, setData] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const {comicId, chapterId} = route.params;

  useEffect(() => {
    getChapter(comicId, chapterId, res => {
      setData(res);
    });
    const storeData = async key => {
      try {
        var items = await AsyncStorage.getItem(key);
        if (!items) {
          await AsyncStorage.setItem('chapters', JSON.stringify([]));
        }
        items = JSON.parse(items);

        const position = getKeyFromStorageItems(items, comicId);
        const item = [comicId, chapterId, new Date().getTime()];
        if (position >= 0) {
          items[position] = item;
        } else {
          items.push(item);
        }
        await AsyncStorage.setItem('chapters', JSON.stringify(items));
        console.log(await AsyncStorage.getItem(key));
      } catch (e) {
        // saving error
      }
    };
    if (comicId && chapterId) {
      storeData('chapters');
    }
  }, [comicId, chapterId]);

  useEffect(() => {
    if (data?.images) {
      getMutipleImages(Object.values(data.images), res => {
        setImageUrls(res);
      });
    }
  }, [data?.images]);

  const handleBack = () => {
    navigation.goBack();
  };

  const renderImages = () => {
    if (imageUrls) {
      return imageUrls.map(image => (
        <Image
          key={image}
          style={styles.image}
          source={{uri: image}}
          resizeMode="contain"
        />
      ));
    }
  };

  return (
    <View style={styles.centeredView}>
      <TouchableWithoutFeedback onPress={handleBack}>
        <View style={styles.backBtn}>
          <FontAwesomeIcon icon={faAngleLeft} size={15} color={colors.white} />
        </View>
      </TouchableWithoutFeedback>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderImages()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {flex: 1, position: 'relative'},
  image: {
    width: '100%',
    height: windowWidth * 7.35,
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 30,
    padding: 5,
    borderRadius: 50,
    backgroundColor: colors.medium,
    opacity: 0.6,
    zIndex: 1,
  },
});

export default ChapterScreen;
