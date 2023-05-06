/* eslint-disable react/react-in-jsx-scope */
import {Image, ScrollView, StyleSheet, View, Text} from 'react-native';

import {colors} from 'res/colors';
import {HorizontalMenu, MenuItem} from 'Components/HorizontalMenu';
import GenreBox from './GenreBox';
import {useState} from 'react';
import TrendingBox from './TrendingBox';
import CollectionBox from './CollectionBox';
import PopularBox from './PopularBox';
import NewBooksBox from './NewBooksBox';

const RANKING_ITEMS = [
  {
    id: 0,
    title: 'Trending',
    image: '',
    component: <TrendingBox />,
    onPress: '',
  },
  {
    id: 1,
    title: 'Collection',
    image: '',
    component: <CollectionBox />,
    onPress: '',
  },
  {
    id: 2,
    title: 'Popular',
    image: '',
    component: <PopularBox />,
    onPress: '',
  },
  {
    id: 3,
    title: 'New Books',
    image: '',
    component: <NewBooksBox />,
    onPress: '',
  },
];

function ComicExploreScreen({navigation}) {
  const [actived, setActived] = useState(-1);
  const [currentBox, setCurrentBox] = useState(<GenreBox />);

  const renderRankingItems = () => {
    return RANKING_ITEMS.map(item => (
      <MenuItem
        key={item.id}
        title={item.title}
        fs={14}
        textTransform="capitalize"
        icon={<Image source={require('res/images/adjust.png')} />}
        style={[styles.menuItem, actived === item.id && styles.actived]}
        onPress={() => {
          setActived(item.id);
          setCurrentBox(item.component);
        }}
      />
    ));
  };

  return (
    <View style={styles.centeredView}>
      <ScrollView style={styles.leftBox}>
        <HorizontalMenu type="column">
          <MenuItem
            title="genre"
            textTransform="capitalize"
            icon={<Image source={require('res/images/adjust.png')} />}
            style={[styles.menuItem, actived === -1 && styles.actived]}
            onPress={() => {
              setActived(-1);
              setCurrentBox(<GenreBox />);
            }}
          />
          <Text style={styles.title}>-- Ranking --</Text>
          {renderRankingItems()}
        </HorizontalMenu>
      </ScrollView>
      <View style={styles.rightBox}>{currentBox}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
  },
  leftBox: {
    left: 0,
    width: 100,
    flexBasis: '25%',
    paddingVertical: 10,
  },
  rightBox: {
    flexGrow: 1,
    backgroundColor: colors.white,
    flexBasis: '75%',
  },
  menuItem: {
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 15,
  },
  actived: {
    borderRadius: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    textAlign: 'center',
    color: colors.medium,
    marginTop: 20,
    marginBottom: 25,
    letterSpacing: 0.6,
  },
});

export default ComicExploreScreen;
