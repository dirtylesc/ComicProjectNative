/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from 'res/colors';
import {getRankedComics} from 'helper/comics';

import {ItemContentView} from 'Components';
import {RankedFlatList} from 'Components/List';

function RankingsBox({navigation, refreshing}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (refreshing) {
      getRankedComics(15, res => {
        setData(res.sort((a, b) => b.avgRate - a.avgRate).splice(0, 15));
      });
    }
  }, [refreshing]);

  return (
    <ItemContentView>
      <View>
        <Text style={styles.title}>Rankings</Text>
        <RankedFlatList
          smallText="Hit New Comic"
          data={data}
          navigation={navigation}
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
