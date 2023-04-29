/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {Text} from '@rneui/base';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';

import {getReviews} from 'helper/reviews';
import {colors} from 'res/colors';
import {ReviewItem} from 'Components/ComicDetail';
import {renderRateStar} from 'Components';

function ReviewDetailsScreen({route, navigation}) {
  const {comicData} = route.params;
  const [data, setData] = useState();

  useEffect(() => {
    getReviews(comicData.id, res => {
      setData(res);
    });
  }, [comicData?.id]);

  const renderReviews = () => {
    if (data) {
      return (
        <View style={styles.reviewsBox}>
          {data.map((item, index) => (
            <ReviewItem
              key={index}
              comicData={comicData}
              data={item}
              bgWebView={colors.white}
              navigation={navigation}
            />
          ))}
        </View>
      );
    }
  };

  return (
    <ScrollView style={[styles.centeredView]}>
      <View style={styles.starBox}>
        <View style={[styles.flex, styles.starEle]}>
          <Text style={styles.starTitle}>Overall Rate</Text>
          {renderRateStar(data?.avgRate)}
        </View>
      </View>
      <View style={styles.replyBox}>
        <View style={styles.flex}>
          <Text style={styles.title}>Reviews</Text>
          <Text style={styles.text}>{data?.length}</Text>
        </View>
        {renderReviews()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  starBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  starEle: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
  },
  starTitle: {
    fontSize: 18,
    fontWeight: '700',
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
    marginBottom: 30,
  },
  replyBox: {
    padding: 15,
    backgroundColor: colors.white,
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
  image: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
  text: {
    fontSize: 16,
    color: colors.medium,
    marginLeft: 6,
    paddingBottom: 7,
  },
  reviewsBox: {
    marginVertical: 10,
  },
});

export default ReviewDetailsScreen;
