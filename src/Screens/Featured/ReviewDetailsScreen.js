/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {faComment, faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Text} from '@rneui/base';
import {renderMessages, renderRateStar} from 'Components';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';
import {calculateUpdatedComicTime} from 'helper/helper';
import {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from 'res/colors';

function ReviewDetailsScreen({route, navigation}) {
  const {userData, comicData, reviewData} = route.params;
  const [urlImage, setUrlImage] = useState();

  console.log(reviewData);

  useEffect(() => {
    //Get Image
    const func = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, `/review_images/${reviewData.image}`);

      await getDownloadURL(imageRef).then(x => {
        setUrlImage(x);
      });
    };

    if (urlImage === undefined && reviewData.image) {
      func();
    }
  }, [reviewData?.image, urlImage]);

  const renderReplies = () => {
    //render from reviewData.comments
  };

  return (
    <ScrollView style={[styles.centeredView]}>
      <View style={styles.reviewBox}>
        <View style={[styles.flex, styles.infoBox]}>
          <Image style={styles.avatarReview} source={{uri: userData.avatar}} />
          <View style={styles.nameBox}>
            <Text style={styles.name} numberOfLines={1}>
              {userData.name}
            </Text>
            {renderRateStar(reviewData.rate)}
          </View>
          <Text style={styles.updatedAt}>
            {calculateUpdatedComicTime(reviewData.updated_at)}
          </Text>
        </View>
        {renderMessages(reviewData.messages, styles.messages)}
        <View style={[styles.flex, styles.comicBox]}>
          <Image style={styles.avatarComic} source={{uri: comicData.avatar}} />
          <View style={styles.nameBox}>
            <Text style={styles.name}>{comicData.name}</Text>
            <Text style={styles.author}>{comicData.author}</Text>
          </View>
        </View>
        <View style={[styles.flex, styles.justifyBetween, {marginTop: 30}]}>
          <Text style={[styles.funcText, {flex: 1}]}>
            Liked by {reviewData.like} people
          </Text>
          <View style={styles.flex}>
            <FontAwesomeIcon
              style={styles.funcIcon}
              icon={faThumbsUp}
              size={22}
              color={colors.primary}
            />
            <Text style={styles.funcText}>LIKE</Text>
          </View>
        </View>
      </View>
      <View style={styles.replyBox}>
        <Text style={styles.title}>Replies</Text>
        {renderReplies()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  reviewBox: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 15,
  },
  comicBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 15,
  },
  replyBox: {
    padding: 15,
  },
  avatarReview: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  avatarComic: {
    width: 40,
    height: 60,
  },
  infoBox: {
    flex: 1,
  },
  nameBox: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: colors.medium,
  },
  updatedAt: {
    marginRight: 10,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  funcIcon: {
    paddingRight: 15,
    paddingLeft: 30,
  },
  funcText: {
    fontSize: 16,
    color: colors.medium,
    fontWeight: 'bold',
    marginRight: 8,
  },
  messages: {
    flex: 1,
    height: 200,
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default ReviewDetailsScreen;
