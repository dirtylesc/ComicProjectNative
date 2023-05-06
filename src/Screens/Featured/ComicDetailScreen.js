/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';

import {ref, getDownloadURL, getStorage} from 'firebase/storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faArrowLeft,
  faBookOpenReader,
  faCirclePlus,
  faCloudArrowDown,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {colors} from 'res/colors';
import {getComic} from 'helper/comics';
import {calculateUpdatedComicTime} from 'helper/helper';
import {ReviewItem} from 'Components/ComicDetail';
import {addComicToLibrary} from 'helper/libraries';
import {auth} from '../../../firebaseConfig';

const ContentItemView = styled(View)`
  padding-top: 15px;
  padding-bottom: 10px;
  border-bottom-width: 0.2px;
  border-bottom-color: ${colors.bg_grey};
`;

function ComicDetailScreen({route, navigation}) {
  const {id} = route.params;
  const [currentChapter, setCurrentChapter] = useState(0);
  const [data, setData] = useState({});
  const [url, setUrl] = useState();

  useEffect(() => {
    getComic(id, res => {
      setData(res);
    });

    const getCurrentChapter = async () => {
      try {
        const value = await AsyncStorage.getItem(`current_chapter_${id}`);
        if (value !== null) {
          setCurrentChapter(value);
        }
      } catch (e) {
        // error reading value
      }
    };

    if (id) {
      getCurrentChapter();
    }
  }, [id]);

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, '/comic_images/' + data.avatar);

      await getDownloadURL(imageRef).then(x => {
        data.avatar = x;
        setUrl(x);
      });
    };

    if (url === undefined && data.avatar) {
      func();
    }
  }, [data, url]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddToLibrary = () => {
    addComicToLibrary(auth.currentUser?.uid, id, currentChapter);
  };

  const renderCategories = () => {
    return data.categories?.map(
      (item, index) =>
        index < 3 && (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              navigation.navigate('Explore');
            }}>
            <Text style={styles.category}>
              {item}
              {index === data.categories.length - 1 ? '' : ' • '}
            </Text>
          </TouchableWithoutFeedback>
        ),
    );
  };

  const renderReviews = () => {
    if (data.ratings) {
      return (
        <View style={styles.reviewsBox}>
          {data.ratings.map((item, index) => (
            <ReviewItem
              key={index}
              comicData={{
                ...data,
                avatar: url,
              }}
              data={item}
              navigation={navigation}
            />
          ))}
        </View>
      );
    }
  };

  const hanleReadNow = () => {
    if (currentChapter) {
      navigation.navigate('Chapter', {
        comicId: id,
        chapterId: currentChapter,
      });
    }
  };

  const hanleGoToReviews = () => {
    if (data.ratings) {
      navigation.navigate('Review', {
        comicData: data,
      });
    }
  };

  return (
    <View style={styles.centeredView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{uri: url}} blurRadius={80}>
          <View style={styles.header}>
            <View style={styles.onBackView}>
              <TouchableWithoutFeedback onPress={handleBack}>
                <View>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    size={24}
                    color={colors.white}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View>
                  <FontAwesomeIcon
                    icon={faShare}
                    size={24}
                    color={colors.white}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.infoBox}>
              <Image source={{uri: url}} style={styles.avatar} />
              <View style={{marginLeft: 20, flex: 1}}>
                <Text style={styles.name} numberOfLines={2}>
                  {data.name} {data.alias && '(' + data.alias + ')'}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                  {data.author}
                </Text>
                <View style={{flexDirection: 'row'}}>{renderCategories()}</View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.contentView}>
          <ContentItemView>
            <Text style={styles.title}>Synopsis</Text>
            <Text style={styles.description} numberOfLines={4}>
              {data.description}
            </Text>
          </ContentItemView>
          <TouchableWithoutFeedback>
            <ContentItemView>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('ChapterContents', {
                    comicId: data.id,
                  });
                }}>
                <View style={[styles.flexRow, styles.spaceBetween]}>
                  <View>
                    <Text style={styles.title}>Contents</Text>
                    <Text style={{color: colors.medium}}>
                      {data.chaptersCount} chapters, still updated
                    </Text>
                  </View>
                  <View style={styles.flexRow}>
                    {data.lastChapter && (
                      <Text style={{marginRight: 5, color: colors.medium}}>
                        {'Updated ' +
                          calculateUpdatedComicTime(
                            data.lastChapter.created_at,
                          )}
                      </Text>
                    )}
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      color={colors.medium}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ContentItemView>
          </TouchableWithoutFeedback>
          <ContentItemView>
            <TouchableWithoutFeedback onPress={hanleGoToReviews}>
              <View style={[styles.flexRow, styles.spaceBetween]}>
                <Text style={styles.title}>Reviews</Text>
                <View style={styles.flexRow}>
                  <Text style={{marginRight: 5, color: colors.medium}}>
                    {data.ratings?.length} Reviews
                  </Text>
                  <FontAwesomeIcon icon={faAngleRight} color={colors.medium} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            {renderReviews()}
          </ContentItemView>
        </View>
      </ScrollView>
      <View style={[styles.funcBox, styles.flexRow]}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.funcBtn}>
            <FontAwesomeIcon
              icon={faCloudArrowDown}
              color={colors.medium}
              size={22}
            />
            <Text style={styles.funcText}>Read Now</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={hanleReadNow}>
          <View style={[styles.funcBtn, styles.funcBtnCenter]}>
            <FontAwesomeIcon
              icon={faBookOpenReader}
              color={colors.white}
              size={22}
            />
            <Text style={[styles.funcText, styles.funcTextCenter]}>
              Read Now
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleAddToLibrary}>
          <View style={styles.funcBtn}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              color={colors.medium}
              size={22}
            />
            <Text style={styles.funcText}>Add To</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  header: {
    marginHorizontal: 20,
    marginVertical: 35,
  },
  onBackView: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoBox: {
    paddingVertical: 40,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  avatar: {
    height: 150,
    width: 120,
    borderRadius: 3,
  },
  name: {
    color: colors.white,
    fontSize: 23,
    fontWeight: '500',
    width: '100%',
    letterSpacing: 0.6,
  },
  author: {
    marginVertical: 12,
    fontSize: 14,
    letterSpacing: 0.6,
    color: colors.primary_lighter,
  },
  description: {
    marginTop: 15,
    fontSize: 15,
    color: colors.large,
    letterSpacing: 0.6,
    lineHeight: 20,
  },
  category: {
    textTransform: 'uppercase',
    color: colors.white,
    fontWeight: '400',
  },
  contentView: {
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: colors.main,
    transform: [{translateY: -20}],
  },
  reviewsBox: {
    marginVertical: 10,
  },
  funcBox: {
    position: 'absolute',
    bottom: -2,
  },
  funcBtn: {
    flexBasis: '33.333%',
    backgroundColor: colors.white,
    paddingVertical: 12,
    alignItems: 'center',
  },
  funcBtnCenter: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  funcText: {
    textAlign: 'center',
    paddingTop: 7,
    color: colors.medium,
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 11,
    letterSpacing: 0.6,
  },
  funcTextCenter: {
    color: colors.white,
  },
});

export default ComicDetailScreen;
