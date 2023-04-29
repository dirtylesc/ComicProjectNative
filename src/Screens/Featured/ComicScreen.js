/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';

import {getComics, getRandomComics} from 'helper/comics';

import {ItemContentView, MainContentView} from 'Components';
import {
  FunctionBox,
  RankingsBox,
  RisingComicsBox,
} from 'Components/Featured/Comic';
import FlatListCustom from 'Components/List/FlatListCustom';

function ComicScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(true);
  const [newComicsData, setNewComicsData] = useState([]);
  const [randomComicsData, setRandomComicsData] = useState([]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      getComics(
        9,
        res => {
          setNewComicsData(res);
        },
        'created_at',
        true,
      );
      generateRandomComics();
    }
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const generateRandomComics = () => {
    getRandomComics(8, res => {
      setRandomComicsData(res);
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <MainContentView>
        <RisingComicsBox navigation={navigation} refreshing={refreshing} />
        <ItemContentView>
          <FunctionBox navigation={navigation} />
        </ItemContentView>
        <ItemContentView>
          <FlatListCustom
            title="New Release"
            smallText="Hit New Comic"
            data={newComicsData}
            navigation={navigation}
            isHorizontal={true}
            numColumns={3}
            listItemType="s"
          />
        </ItemContentView>
        <ItemContentView>
          <FlatListCustom
            title="You May Also Like"
            data={randomComicsData}
            navigation={navigation}
            onPressForRandom={() => generateRandomComics()}
            numColumns={4}
            listItemType="m"
          />
        </ItemContentView>
        <RankingsBox navigation={navigation} refreshing={refreshing} />
      </MainContentView>
    </ScrollView>
  );
}

export default ComicScreen;
