/* eslint-disable no-bitwise */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {colors} from 'res/colors';
import {HorizontalMenu, MenuItem} from 'Components/HorizontalMenu';
import {ItemContentView, MainContentView} from 'Components';
import {Image, ScrollView} from 'react-native';
import FlatListCustom from 'Components/List/FlatListCustom';
import {getComics, getRandomComics} from 'helper/comics';
import {useEffect, useState} from 'react';

const MenuFunc = ({navigation}) => {
  return (
    <HorizontalMenu type="row">
      <MenuItem
        title="genre"
        icon={<Image source={require('res/icons/adjust.png')} />}
        bgColor={colors.quaternary_lighter}
        size={20}
        onPress={() => {
          navigation.navigate('Explore');
        }}
      />
      <MenuItem
        title="New"
        icon={<Image source={require('res/icons/new.png')} />}
        bgColor={colors.negative_lighter}
        size={20}
        onPress={() => {}}
      />
      <MenuItem
        title="Event"
        icon={<Image source={require('res/icons/calendar.png')} />}
        bgColor={colors.event}
        size={20}
        onPress={() => {}}
      />
      <MenuItem
        title="Rank"
        icon={<Image source={require('res/icons/rank.png')} />}
        bgColor={colors.rank}
        size={20}
        onPress={() => {}}
      />
    </HorizontalMenu>
  );
};

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
          <MenuFunc navigation={navigation} />
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
      </MainContentView>
    </ScrollView>
  );
}

export default ComicScreen;
