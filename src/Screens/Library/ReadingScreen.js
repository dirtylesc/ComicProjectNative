/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, FlatList, RefreshControl} from 'react-native';

import {auth} from '../../../firebaseConfig';
import LibraryHorizonalItem from './LibraryHorizonalItem';
import {getComicsForLibrary} from 'helper/libraries';
import {getValueByKey} from 'Enums/SortByLibrariesEnum';
import {ArrayView as arraySortBy} from 'Enums/SortByLibrariesEnum';
import ItemRadioPopup from 'Components/ItemRadioPopup';

import BottomPopup from 'Components/BottomPopup';
import ItemBottomPopup from 'Components/ItemBottomPopup';
import {faFileCircleCheck} from '@fortawesome/free-solid-svg-icons';
import ListItemPopup from 'Components/ListItemPopup';
import {sortAlphaBArr} from 'helper/helper';

function ReadingScreen({route, navigation}) {
  const popupRef = route.params.popupRef;
  const [activedSort, setActivedSort] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
    if (auth.currentUser?.uid) {
      const groupBy = getValueByKey(activedSort).by;

      getComicsForLibrary(
        auth.currentUser?.uid,
        res => {
          if (groupBy === 'alphabetical') {
            setData(sortAlphaBArr(res, 'comicName'));
          } else {
            setData(res);
          }
        },
        groupBy,
      );
    }
  }, [activedSort, refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleNavigateHistory = () => {
    navigation.navigate('History');
  };

  const renderSortByItems = () => {
    return arraySortBy().map(item => (
      <ItemRadioPopup
        key={item.key}
        title={item.title}
        onPress={() => {
          setActivedSort(item.key);
          popupRef.current.close();
        }}
        active={item.key === activedSort}
      />
    ));
  };

  return (
    !refreshing && (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.centeredView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <BottomPopup ref={popupRef}>
          <ItemBottomPopup
            icon={faFileCircleCheck}
            text="Viewed"
            onPress={handleNavigateHistory}
          />
          <ListItemPopup title="Sort by">{renderSortByItems()}</ListItemPopup>
          {/* <ListItemPopup title="View mode"></ListItemPopup> */}
        </BottomPopup>
        <FlatList
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={3}
          renderItem={({item}) => (
            <LibraryHorizonalItem
              key={item.id}
              id={item.id}
              comicId={item.comicId}
              chapterId={item.chapterId}
              onPressChapter={() => {
                navigation.navigate('Chapter', {
                  comicId: item.comicId,
                  chapterId: item.chapterId,
                });
              }}
              onPressComic={() => {
                navigation.navigate('ComicDetail', {
                  id: item.comicId,
                });
              }}
              onRefresh={onRefresh}
            />
          )}
        />
      </ScrollView>
    )
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginHorizontal: 7,
    marginVertical: 15,
  },
  popUpIcon: {
    position: 'absolute',
    right: 15,
    top: -26,
    zIndex: 1,
  },
});

export default ReadingScreen;
