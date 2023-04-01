/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';

import {getComics} from 'helper/comics';

import {ItemContentView} from 'Components';
import {RankedFlatList} from 'Components/List';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from 'res/colors';

function RankingsBox() {
  const [rankedComicData, setRankedComicData] = useState([]);
  useEffect(() => {
    getComics(
      15,
      res => {
        setRankedComicData(res);
      },
      'rating',
      true,
    );
  }, []);

  return (
    <ItemContentView>
      <View>
        <Text style={styles.title}>Rankings</Text>
        <RankedFlatList
          smallText="Hit New Comic"
          data={rankedComicData}
          isHorizontal={true}
          numColumns={3}
          listItemType="s"
        />
      </View>
    </ItemContentView>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 18,
    paddingTop: 10,
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0.6,
    color: colors.large,
    textTransform: 'capitalize',
  },
});

export default RankingsBox;
