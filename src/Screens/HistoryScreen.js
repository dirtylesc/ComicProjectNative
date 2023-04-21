/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryItem from 'Components/HistoryItem';

function HistoryScreen({navigation}) {
  const [data, setData] = useState();

  useEffect(() => {
    const func = async () => {
      const items = await AsyncStorage.getItem('chapters');
      if (items) {
        setData(JSON.parse(items));
      }
    };

    if (data === undefined) {
      func();
    }
  }, [data]);

  const renderComics = () => {
    if (data) {
      return data.map(item => (
        <HistoryItem
          key={item[0]}
          comicId={item[0]}
          chapterId={item[1]}
          time={item[2]}
          onPress={() => {
            navigation.navigate('Chapter', {
              comicId: item[0],
              chapterId: item[1],
            });
          }}
        />
      ));
    }
  };

  return <ScrollView style={styles.centeredView}>{renderComics()}</ScrollView>;
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default HistoryScreen;
