/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faComment, faThumbsUp} from '@fortawesome/free-regular-svg-icons';

import {ref, getDownloadURL, getStorage} from 'firebase/storage';
import {calculateUpdatedComicTime} from 'helper/helper';
import {getUserForReview} from 'helper/users';
import {colors} from 'res/colors';
import {renderMessages, renderRateStar} from 'Components';

function ReviewItem({comicData, data, navigation}) {
  const [urlAvatar, setUrlAvatar] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserForReview(data.user_id, res => {
      setUserData(res);
    });
  }, [data.user_id]);

  useEffect(() => {
    //Get Avatar
    const func = async () => {
      if (!userData.avatar.startsWith('http')) {
        const storage = getStorage();
        const imageRef = ref(
          storage,
          `/user_images/${data.user_id}/${userData.avatar}`,
        );

        await getDownloadURL(imageRef).then(x => {
          setUrlAvatar(x);
        });
      } else {
        setUrlAvatar(userData.avatar);
      }
    };

    if (urlAvatar === undefined && userData?.avatar) {
      func();
    }
  }, [urlAvatar, data.user_id, userData?.avatar, userData]);

  const handlePress = () => {
    if (data && userData) {
      navigation.navigate('ReviewDetails', {
        userData: {
          ...userData,
          avatar: urlAvatar,
        },
        comicData: comicData,
        reviewData: data,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.centeredView]}>
        <Image style={styles.avatar} source={{uri: urlAvatar}} />
        <View style={styles.infoBox}>
          <View>
            <Text style={styles.name} numberOfLines={1}>
              {userData?.name}
            </Text>
            {renderRateStar(data.rate)}
          </View>
          {renderMessages(data.messages, styles.webViewMessages)}
          <View style={[styles.flex, styles.justifyBetween]}>
            <Text>{calculateUpdatedComicTime(data.updated_at)}</Text>
            <View style={[styles.funcBox, styles.flex]}>
              <View style={styles.flex}>
                <FontAwesomeIcon
                  style={styles.funcIcon}
                  icon={faThumbsUp}
                  size={20}
                  color={colors.medium}
                />
                <Text style={styles.funcText}>{data.like}</Text>
              </View>
              <View style={styles.flex}>
                <FontAwesomeIcon
                  style={styles.funcIcon}
                  icon={faComment}
                  size={20}
                  color={colors.medium}
                />
                <Text style={styles.funcText}>
                  {data.comments?.length || 0}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
    marginVertical: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  infoBox: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 15,
  },
  messages: {
    fontSize: 17,
    marginVertical: 12,
    letterSpacing: 0.6,
    lineHeight: 22,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  funcBox: {},
  funcIcon: {
    paddingRight: 15,
    paddingLeft: 30,
  },
  funcText: {
    fontSize: 18,
    color: colors.medium,
  },
  webViewMessages: {
    flex: 1,
    height: 103,
    backgroundColor: colors.main,
    fontSize: 24,
    marginVertical: 10,
  },
});

export default ReviewItem;
