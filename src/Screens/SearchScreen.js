/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useRef, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';

import {colors} from 'res/colors';
import {findComics, getComics, getRankedCompletedComics} from 'helper/comics';
import AlertConfirmCustom from 'Components/AlertConfirmCustom';
import {SearchHeader, TopBox} from 'Components/Search';
import TouchIcon from 'Components/TouchIcon';
import {FlatListCustom, RankedFlatList} from 'Components/List';

const TextEle = styled(Text)`
  background-color: ${colors.border};
  text-align: center;
  border-radius: 20px;
  padding: 10px 12px;
  min-width: 50px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.6px;
  margin-right: 10px;
  margin-bottom: 20px;
`;

function SearchScreen({navigation}) {
  const [searchInput, setSearchInput] = useState('');
  const [dataSearch, setDataSearch] = useState();
  const [searchHistories, setSearchHistories] = useState();
  const [completedData, setCompletedData] = useState();
  const deletionRef = useRef();

  useEffect(() => {
    const storeData = async () => {
      const items = await AsyncStorage.getItem('searchHistories');
      setSearchHistories(JSON.parse(items));
    };

    storeData();
  }, []);

  useEffect(() => {
    getRankedCompletedComics(10, res =>
      setCompletedData(res.sort((a, b) => b.avgRate - a.avgRate).splice(0, 10)),
    );
  }, []);

  useEffect(() => {
    if (searchInput.toLowerCase().trim() !== '') {
      findComics(searchInput, 5, res => setDataSearch(res.splice(0, 7)));
    } else {
      setDataSearch();
    }
  }, [searchInput]);

  const renderSearchHistories = () => {
    if (searchHistories.length > 1) {
      return searchHistories.map(item => <TextEle key={item}>{item}</TextEle>);
    } else {
      return <TextEle>{searchHistories[0]}</TextEle>;
    }
  };

  const onChangeSearch = val => {
    setSearchInput(val);
  };

  const handleShowDeletionModal = () => {
    deletionRef.current.show();
  };

  const handleClearHistory = async () => {
    deletionRef.current.close();
    setSearchHistories();
    await AsyncStorage.removeItem('searchHistories');
  };

  const renderFindBox = () => {
    if (searchInput !== '' && dataSearch) {
      return (
        <View style={styles.findBox}>
          <FlatListCustom
            data={dataSearch}
            isSearch={true}
            navigation={navigation}
            isHorizontal={true}
            numColumns={1}
            listItemType="s"
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.centeredView}>
      <SearchHeader navigation={navigation} onChangeSearch={onChangeSearch} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          {searchHistories && (
            <View>
              <View style={[styles.flex, {justifyContent: 'space-between'}]}>
                <Text style={styles.title}>History</Text>
                <TouchIcon
                  onPress={handleShowDeletionModal}
                  hidden={false}
                  icon={faTrashCan}
                  size={20}
                  color={colors.medium}
                />
              </View>
              <ScrollView
                style={styles.textBox}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {renderSearchHistories()}
              </ScrollView>
              <AlertConfirmCustom
                title="Confirm deletion of search history?"
                cancelText="cancel"
                submitText="sure"
                onPressCancel={() => {
                  deletionRef.current.close();
                }}
                onPressSubmit={() => {
                  handleClearHistory();
                }}
                ref={deletionRef}
              />
            </View>
          )}

          <View>
            <Text style={styles.title}>Popular Searches</Text>
            <View style={[styles.flex, styles.textBox, styles.popularBox]}>
              <TextEle>c</TextEle>
              <TextEle>only I level up (Solo Leveling)</TextEle>
              <TextEle>only I level up (Solo Leveling)</TextEle>
              <TextEle>only I level up (Solo Leveling)</TextEle>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={styles.topBox}>
            <TopBox
              title={'Top 10 Completed'}
              data={completedData}
              navigation={navigation}
            />
            {/* <TopBox title={'Top 10 Completed'} />
            <TopBox title={'Top 10 Completed'} /> */}
          </ScrollView>
        </View>
        {renderFindBox()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.main,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBox: {
    margin: 20,
  },
  findBox: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: colors.main,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0.6,
  },
  textBox: {
    marginTop: 15,
  },
  popularBox: {
    flexWrap: 'wrap',
  },
  topBox: {
    marginTop: 20,
  },
});

export default SearchScreen;
