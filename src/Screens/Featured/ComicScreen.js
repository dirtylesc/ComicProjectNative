/* eslint-disable react/react-in-jsx-scope */
import {ItemContentView, MainContentView} from 'Components';
import {ScrollView} from 'react-native';
import FlatListCustom from 'Components/List/FlatListCustom';
import {getComics, getRandomComics} from 'helper/comics';
import {useEffect, useState} from 'react';
import {FunctionBox} from 'Components/Featured/Comic';

function ComicScreen({navigation}) {
  const [risingComicsData, setRisingComicsData] = useState([]);
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
    getComics(6, res => {
      setRisingComicsData(res);
    });
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
        <ItemContentView>
          <FlatListCustom
            title="Rising Comics"
            data={risingComicsData}
            numColumns={3}
            listItemType="l"
          />
        </ItemContentView>
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
        <ItemContentView>
          <FlatListCustom
            title="Rankings"
            data={randomComicsData}
            onPressForRandom={() => generateRandomComics()}
            numColumns={4}
            listItemType="m"
          />
        </ItemContentView>
      </MainContentView>
    </ScrollView>
  );
}

export default ComicScreen;
