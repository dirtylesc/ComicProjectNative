/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {getComics, getRandomComics} from 'helper/comics';

import {ItemContentView, MainContentView} from 'Components';
import {
  FunctionBox,
  RankingsBox,
  RisingComicsBox,
} from 'Components/Featured/Comic';
import FlatListCustom from 'Components/List/FlatListCustom';

function ComicScreen({navigation}) {
  const [newComicsData, setNewComicsData] = useState([]);
  const [randomComicsData, setRandomComicsData] = useState([]);
  useEffect(() => {
    getComics(
      9,
      res => {
        setNewComicsData(res.reverse());
      },
      'created_at',
      true,
    );
    generateRandomComics();
  }, []);

  const generateRandomComics = () => {
    getRandomComics(8, res => {
      setRandomComicsData(res);
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainContentView>
        <RisingComicsBox />
        <ItemContentView>
          <FunctionBox navigation={navigation} />
        </ItemContentView>
        <ItemContentView>
          <FlatListCustom
            title="New Release"
            smallText="Hit New Comic"
            data={newComicsData}
            isHorizontal={true}
            numColumns={3}
            listItemType="s"
          />
        </ItemContentView>
        <ItemContentView>
          <FlatListCustom
            title="You May Also Like"
            data={randomComicsData}
            onPressForRandom={() => generateRandomComics()}
            numColumns={4}
            listItemType="m"
          />
        </ItemContentView>
        <RankingsBox />
      </MainContentView>
    </ScrollView>
  );
}

export default ComicScreen;
