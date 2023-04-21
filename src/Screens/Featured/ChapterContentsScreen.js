/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {getAllChapters} from 'helper/chapters';
import {ChapterContentItem} from 'Components/ComicDetail';
import {colors} from 'res/colors';

function ChapterContentsScreen({route, navigation}) {
  const {comicId} = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllChapters(comicId, res => {
      setData(res);
    });
  }, [comicId]);

  const renderComicContents = () => {
    if (data) {
      return data.map((item, index) => (
        <ChapterContentItem
          key={item.number}
          data={item}
          number={index}
          comicId={comicId}
          navigation={navigation}
        />
      ));
    }
  };

  return (
    <ScrollView style={styles.centeredView}>{renderComicContents()}</ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: colors.main,
  },
});

export default ChapterContentsScreen;
